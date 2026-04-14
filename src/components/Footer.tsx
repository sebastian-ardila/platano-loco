import { useTranslation } from 'react-i18next';
import {
  FaInstagram,
  FaFacebookF,
  FaMapMarkerAlt,
  FaWhatsapp,
} from 'react-icons/fa';

const socialLinks = [
  {
    icon: FaInstagram,
    label: '@platanoloco.pei',
    href: 'https://instagram.com/platanoloco.pei',
  },
  {
    icon: FaFacebookF,
    label: 'Platano Loco',
    href: 'https://www.facebook.com/pepperparrilla/?locale=es_LA',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Google Maps',
    href: 'https://www.google.com/maps/place/Platano+Loco/@4.803436,-75.6982298,17.96z/data=!4m6!3m5!1s0x8e38870047628919:0x3d69742a5cd24002!8m2!3d4.8036195!4d-75.6971301!16s%2Fg%2F11xt2y_jq1',
  },
  {
    icon: FaWhatsapp,
    label: '310 899 2871',
    href: 'https://wa.me/573108992871',
  },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <img
              src={import.meta.env.BASE_URL + 'platano-loco-logo.webp'}
              alt="Platano Loco"
              className="h-16"
            />
            <h3 className="text-xl font-bold">Platano Loco</h3>
            <p className="text-sm uppercase tracking-wider text-brand/80">
              PLÁTANO MADURO RECETA DE MI APÁ
            </p>
            <p className="text-sm text-white/50">
              Cl. 21 Bis #21-20, Pereira, Risaralda
            </p>
            <p className="text-sm text-white/50">{t('footer.deliveryNote')}</p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-start">
            <h3 className="text-xl font-bold">{t('schedule.hours')}</h3>
            <div className="rounded-lg bg-white/5 px-5 py-4 text-sm">
              <p>{t('scheduleData.monSun')}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-start">
            <h3 className="text-xl font-bold">{t('footer.followUs')}</h3>
            <ul className="flex flex-col gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-brand"
                  >
                    <Icon className="text-lg" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-white/40 md:flex-row">
          <p>Platano Loco &copy; {t('footer.rights')}.</p>
          <p>
            {t('footer.madeBy')}{' '}
            <a
              href="https://sebastianardila.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-brand"
            >
              sebastianardila.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
