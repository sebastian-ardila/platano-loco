import { useTranslation } from 'react-i18next';
import { MdSchedule, MdLocationOn } from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';
import CTASection from '../components/CTASection';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Platano+Loco/@4.803436,-75.6982298,17.96z/data=!4m6!3m5!1s0x8e38870047628919:0x3d69742a5cd24002!8m2!3d4.8036195!4d-75.6971301!16s%2Fg%2F11xt2y_jq1';

export default function Schedule() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-white">{t('schedule.title')}</h1>

      {/* Horario + Ubicación lado a lado */}
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl bg-surface p-6">
          <MdSchedule className="text-3xl text-brand" />
          <div>
            <h3 className="text-lg font-bold text-white">{en ? 'Monday to Sunday' : 'Lunes a Domingo'}</h3>
            <p className="text-2xl font-bold text-brand">4:30 PM - 10:00 PM</p>
          </div>
        </div>

        <div className="rounded-2xl bg-surface p-6">
          <div className="mb-3 flex items-center gap-2">
            <MdLocationOn className="text-2xl text-brand" />
            <h3 className="text-lg font-bold text-white">{t('schedule.location')}</h3>
          </div>
          <p className="mb-1 text-gray-300">Cl. 21 Bis #21-20, Pereira, Risaralda</p>
          <p className="text-sm text-gray-500">{t('schedule.deliveryNote')}</p>
        </div>
      </div>

      {/* Cómo llegar */}
      <div className="mb-10">
        <h3 className="mb-4 text-lg font-bold text-white">{t('schedule.howToGet')}</h3>
        <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl bg-surface px-5 py-4 font-medium text-gray-300 transition-colors hover:bg-surface-light">
          <SiGooglemaps className="text-xl text-red-400" /> {t('schedule.googleMaps')}
        </a>
      </div>

      <CTASection secondaryLabel={en ? 'Reserve' : 'Reservar'} secondaryHref="/reservas" />
    </div>
  );
}
