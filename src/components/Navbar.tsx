import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MdRestaurantMenu,
  MdEventSeat,
  MdSchedule,
  MdHistoryEdu,
  MdContactMail,
  MdShoppingCart,
  MdMenu,
  MdClose,
  MdTableRestaurant,
} from 'react-icons/md';
import { useCart } from '../context/CartContext';
import { useTable } from '../context/TableContext';

interface NavbarProps {
  onOpenTableModal: () => void;
  onOpenCart: () => void;
}

const navItems = [
  { path: '/', icon: MdRestaurantMenu, labelKey: 'nav.menu' },
  { path: '/reservas', icon: MdEventSeat, labelKey: 'nav.reservations' },
  { path: '/horarios', icon: MdSchedule, labelKey: 'nav.schedule' },
  { path: '/historia', icon: MdHistoryEdu, labelKey: 'nav.history' },
  { path: '/contacto', icon: MdContactMail, labelKey: 'nav.contact' },
];

export default function Navbar({ onOpenTableModal, onOpenCart }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { totalItems } = useCart();
  const { tableNumber, hasTable } = useTable();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname === path;
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-surface shadow-lg shadow-black/20">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex-shrink-0">
            <img
              src={import.meta.env.BASE_URL + 'platano-loco-logo.webp'}
              alt="Platano Loco"
              className="h-12"
            />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map(({ path, icon: Icon, labelKey }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-3 py-1 text-sm transition-colors ${
                  isActive(path)
                    ? 'border-b-2 border-brand font-bold text-brand'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="text-base" />
                {t(labelKey)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTableModal}
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] sm:text-xs transition-colors ${
                hasTable
                  ? 'bg-brand text-black font-bold'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <MdTableRestaurant className="text-sm" />
              {hasTable ? `Mesa ${tableNumber}` : t('table.badge')}
            </button>

            <button
              onClick={toggleLang}
              className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-400 hover:text-brand transition-colors"
            >
              <MdShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-black">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-gray-400 md:hidden"
            >
              <MdMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#111111] flex flex-col">
          <div className="flex h-16 items-center justify-between px-4">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <img
                src={import.meta.env.BASE_URL + 'platano-loco-logo.webp'}
                alt="Platano Loco"
                className="h-12"
              />
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-white">
              <MdClose className="text-3xl" />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            {navItems.map(({ path, icon: Icon, labelKey }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 text-2xl transition-colors ${
                  isActive(path)
                    ? 'border-b-2 border-brand font-bold text-brand'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon />
                {t(labelKey)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
