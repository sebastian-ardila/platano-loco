import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdHome, MdRestaurantMenu, MdEventSeat, MdSchedule, MdHistoryEdu, MdContactMail } from 'react-icons/md';

const routeConfig: Record<string, { labelKey: string; icon: React.ComponentType<{ className?: string }> }> = {
  '/reservas': { labelKey: 'nav.reservations', icon: MdEventSeat },
  '/horarios': { labelKey: 'nav.schedule', icon: MdSchedule },
  '/historia': { labelKey: 'nav.history', icon: MdHistoryEdu },
  '/contacto': { labelKey: 'nav.contact', icon: MdContactMail },
  '/': { labelKey: 'nav.menu', icon: MdRestaurantMenu },
};

export default function Breadcrumb() {
  const location = useLocation();
  const { t } = useTranslation();

  const isHome = location.pathname === '/' || location.pathname === '';
  if (isHome) return null;

  const current = routeConfig[location.pathname];
  if (!current) return null;

  const Icon = current.icon;

  return (
    <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="flex items-center gap-1 hover:text-brand transition-colors">
            <MdHome className="text-base" />
            {t('breadcrumb.home')}
          </Link>
          <span>&gt;</span>
          <span className="flex items-center gap-1 font-medium text-brand">
            <Icon className="text-base" />
            {t(current.labelKey)}
          </span>
        </div>
      </div>
    </div>
  );
}
