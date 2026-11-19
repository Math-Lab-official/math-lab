import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  actions?: React.ReactNode;
  footnote?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  image,
  imageAlt,
  actions,
  footnote,
}) => {
  return (
    <section className="relative w-full min-h-[34vh] flex items-end overflow-hidden bg-[#0a192f]">
      <img
        src={image}
        alt={imageAlt}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#071426]/92 via-[#0d2447]/65 to-[#0a192f]/40" />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="max-w-2xl space-y-2.5">
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-[1.08] tracking-tight text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
          {actions && <div className="flex flex-wrap items-center gap-2.5 pt-2">{actions}</div>}
        </div>
      </div>

      {footnote && (
        <div className="hidden sm:block absolute bottom-4 right-8 z-10 max-w-xs text-right">
          <p className="text-[11px] text-white/65 leading-relaxed">{footnote}</p>
        </div>
      )}
    </section>
  );
};
