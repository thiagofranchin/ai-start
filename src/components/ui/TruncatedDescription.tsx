'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const TOOLTIP_DELAY_MS = 2000;
const TOOLTIP_MAX_WIDTH = 320;

interface TooltipPos {
  top: number;
  left: number;
  maxWidth: number;
  below: boolean;
}

/**
 * Renderiza a descrição do card preservando o CSS existente (`<p>` clamped).
 * Só habilita o tooltip quando o texto está realmente truncado, e apenas em
 * dispositivos com hover real (desktop). O delay de 2s evita abrir em passeio.
 *
 * O tooltip é montado num portal no <body>: os cards usam `backdrop-filter` +
 * `overflow: hidden`, e o `backdrop-filter` transforma o card no containing
 * block de descendentes `position: fixed`, o que faria o tooltip ser cortado.
 */
export default function TruncatedDescription({ text }: { text: string }) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const [pos, setPos] = useState<TooltipPos | null>(null);

  useEffect(() => setMounted(true), []);

  const checkTruncation = useCallback(() => {
    const el = pRef.current;
    if (!el) return;
    const clipped =
      el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;
    // Enquanto o elemento não estiver visível/medido, mantém o último estado
    setTruncated(el.clientHeight > 0 ? clipped : false);
  }, []);

  useEffect(() => {
    const el = pRef.current;
    if (!el) return;

    checkTruncation();

    // Recheca ao redimensionar (muda a quantidade de linhas do clamp)
    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(el);

    // Recheca quando as fontes terminarem de carregar (métricas mudam)
    document.fonts?.ready.then(checkTruncation).catch(() => undefined);
    const retry = window.setTimeout(checkTruncation, 400);

    return () => {
      resizeObserver.disconnect();
      window.clearTimeout(retry);
    };
  }, [checkTruncation, text]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const hide = useCallback(() => {
    clearTimer();
    setPos(null);
  }, [clearTimer]);

  // O hover é capturado no card inteiro porque o link overlay (.card-link)
  // cobre o <p>; o card é o elemento pai do wrapper
  useEffect(() => {
    const el = pRef.current;
    const hoverTarget = el?.closest('.trunc-desc-wrapper')?.parentElement;
    if (!el || !hoverTarget || !truncated) return;

    // Descarta apenas ponteiro coarse de toque (mobile) — em desktop, mesmo
    // quando o browser reporta hover: none (ex.: headless/CI), o tooltip funciona
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const onEnter = () => {
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        const rect = el.getBoundingClientRect();
        const below = rect.top < 150;
        setPos({
          top: below ? rect.bottom + 10 : rect.top - 10,
          left: Math.max(12, Math.min(rect.left, window.innerWidth - TOOLTIP_MAX_WIDTH - 24)),
          maxWidth: Math.min(TOOLTIP_MAX_WIDTH, window.innerWidth - 24),
          below,
        });
      }, TOOLTIP_DELAY_MS);
    };

    hoverTarget.addEventListener('mouseenter', onEnter);
    hoverTarget.addEventListener('mouseleave', hide);
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
    return () => {
      hoverTarget.removeEventListener('mouseenter', onEnter);
      hoverTarget.removeEventListener('mouseleave', hide);
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
      clearTimer();
    };
  }, [truncated, clearTimer, hide]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return (
    <span className="trunc-desc-wrapper">
      <p ref={pRef}>{text}</p>
      {mounted &&
        pos &&
        createPortal(
          <span
            className={`trunc-desc-tooltip ${pos.below ? 'below' : 'above'}`}
            role="tooltip"
            style={{ top: pos.top, left: pos.left, maxWidth: pos.maxWidth }}
          >
            {text}
          </span>,
          document.body
        )}
    </span>
  );
}
