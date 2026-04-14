import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CTASectionProps {
  secondaryLabel: string;
  secondaryHref: string;
}

export default function CTASection({ secondaryLabel, secondaryHref }: CTASectionProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-16 overflow-hidden rounded-2xl">
      <div
        className="relative flex flex-col items-center gap-8 px-8 py-12 md:flex-row md:items-center md:justify-between md:px-12 md:py-16"
      >
        {/* Background image + overlay */}
        <img
          src={import.meta.env.BASE_URL + 'cta-bg.webp'}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />

        {/* Text - left side */}
        <div className="relative z-10 text-center md:text-left">
          <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
            {t('cta.explore')}
          </h3>
          <p className="max-w-md text-sm text-white/60 md:text-base">
            {t('cta.description')}
          </p>
        </div>

        {/* Buttons - right side, stacked */}
        <div className="relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:min-w-[220px]">
          <Link
            to="/"
            className="rounded-full bg-brand px-8 py-3.5 text-center text-base font-bold text-black transition-colors hover:bg-brand-dark"
          >
            {t('cta.viewMenu')}
          </Link>
          <Link
            to={secondaryHref}
            className="rounded-full border-2 border-white px-8 py-3.5 text-center text-base font-bold text-white transition-colors hover:bg-white/10"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
