import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?sca_esv=ac7700c26f5fc397&sxsrf=ANbL-n5CukdCrKX0ntmUj5CZ_M6dQS9-Pg:1776017207086&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZDdB1FGk0I2RONPAp7_JhgFCR78RmWjmsM7kMoh5bisqS5k9xf5MJofaq83hehoqCDps6sU4jxMibzlyKsLlRdYc9Rg&q=Platano+Loco+Opiniones&sa=X&ved=2ahUKEwjC-vjV8-iTAxUJp7AFHds6EowQ0bkNegQIIRAF&biw=1536&bih=730&dpr=1.25#lrd=0x8e38870047628919:0x3d69742a5cd24002,3,,,,';

export default function Hero() {
  const { t } = useTranslation();

  const scrollToCarta = () => {
    const el = document.getElementById('carta');
    if (el) {
      const offset = 64;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={import.meta.env.BASE_URL + 'video-hero-1.webm'} type="video/webm" />
        <source src={import.meta.env.BASE_URL + 'video-hero-1.mp4'} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/50" />

      {/* Radial dark glow behind content */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-black/60 blur-[120px] md:h-[800px] md:w-[800px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
        <img
          src={import.meta.env.BASE_URL + 'platano-loco-logo.webp'}
          alt="Platano Loco"
          className="mx-auto mb-6 h-48 md:h-72 lg:h-80"
        />

        <p className="mb-8 text-xs uppercase tracking-[0.25em] text-white/60 md:text-sm">
          {t('hero.phrase')}
        </p>

        {/* CTA buttons */}
        <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={scrollToCarta}
            className="rounded-full bg-brand px-8 py-3 text-lg font-bold text-accent transition-colors hover:bg-brand-dark"
          >
            {t('hero.viewMenu')}
          </button>
          <Link
            to="/reservas"
            className="rounded-full border-2 border-white px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-white/10"
          >
            {t('hero.reserveTable')}
          </Link>
        </div>

        {/* Opinion button */}
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70"
        >
          <FaGoogle className="text-[10px]" />
          {t('hero.rateGoogle')}
        </a>
      </div>
    </section>
  );
}
