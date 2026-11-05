import Image from 'next/image';

interface CardIconProps {
  icon: string;
  color: string;
  className?: string;
  size?: number;
}

/** Ícone de card: emoji/símbolo (texto) ou imagem local (caminho começando com "/"). */
export default function CardIcon({ icon, color, className = 'card-icon', size = 22 }: CardIconProps) {
  const isImage = icon.startsWith('/');
  return (
    <div className={`${className} ${color}`} aria-hidden="true">
      {isImage ? (
        // SVGs locais já são otimizados à mão; o otimizador do Next não processa SVG
        <Image src={icon} alt="" width={size} height={size} unoptimized className="card-icon-img" />
      ) : (
        icon
      )}
    </div>
  );
}
