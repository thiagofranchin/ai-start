import type { Metadata } from 'next';

export const SITE_URL = 'https://ai-start-v1.vercel.app';
export const SITE_NAME = 'ai-start';
export const SITE_DESCRIPTION = 'Hub pessoal para acesso rápido a IAs, repositórios, cripto e comandos do dia a dia.';

/** Metadata por página: título (usa o template do layout) + Open Graph/canonical. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · ${SITE_NAME}`, description, url: path, siteName: SITE_NAME, locale: 'pt_BR', type: 'website' },
  };
}
