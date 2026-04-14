import { useTranslation } from 'react-i18next';
import CTASection from '../components/CTASection';

export default function History() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-white">{t('history.title')}</h1>

      {/* Primera card full width */}
      <div className="mb-6 rounded-2xl bg-surface p-6 md:p-8">
        <p className="text-lg leading-relaxed text-gray-300">{t('history.content1')}</p>
      </div>

      {/* Dos cards lado a lado */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-brand/10 border border-brand/20 p-6 md:p-8">
          <p className="text-lg leading-relaxed text-gray-300">{t('history.content2')}</p>
        </div>

        <div className="rounded-2xl bg-surface p-6 md:p-8">
          <p className="text-lg leading-relaxed text-gray-300">{t('history.content3')}</p>
        </div>
      </div>

      <CTASection secondaryLabel={en ? 'Reserve' : 'Reservar'} secondaryHref="/reservas" />
    </div>
  );
}
