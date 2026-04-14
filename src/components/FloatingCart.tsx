import { useTranslation } from 'react-i18next';
import { MdShoppingCart } from 'react-icons/md';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/menu';

interface FloatingCartProps {
  onClick: () => void;
  cartOpen: boolean;
}

export default function FloatingCart({ onClick, cartOpen }: FloatingCartProps) {
  const { t } = useTranslation();
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0 || cartOpen) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-brand px-6 py-3 text-black shadow-lg shadow-brand/20 transition-transform hover:scale-105"
    >
      <MdShoppingCart className="text-xl" />
      <span className="text-sm font-bold">
        {totalItems} {t('cart.products')}
      </span>
      <span className="rounded-full bg-black px-3 py-0.5 text-sm font-bold text-brand">
        {formatPrice(totalPrice)}
      </span>
    </button>
  );
}
