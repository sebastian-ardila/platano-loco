import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdClose, MdAdd, MdRemove, MdDelete, MdTableRestaurant } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useTable } from '../context/TableContext';
import { formatPrice } from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { t, i18n } = useTranslation();
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const { tableNumber: urlTable, hasTable: hasUrlTable } = useTable();
  const en = i18n.language === 'en';

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderType, setOrderType] = useState('');
  const [localTable, setLocalTable] = useState('');
  const [address, setAddress] = useState('');
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setTried(false);
    }
  }, [isOpen]);

  const handleOrderType = (type: string) => {
    setOrderType(type);
    if (type === 'dineIn' && hasUrlTable) {
      setLocalTable(urlTable);
    }
  };

  const nameValid = name.trim().length > 0;
  const paymentValid = paymentMethod.length > 0;
  const orderTypeValid = orderType.length > 0;
  const tableValid = orderType !== 'dineIn' || localTable.length > 0;
  const addressValid = orderType !== 'delivery' || address.trim().length > 0;
  const allValid = nameValid && paymentValid && orderTypeValid && tableValid && addressValid;

  const paymentEmoji: Record<string, string> = {
    transfer: '🏦',
    card: '💳',
    cash: '💵',
  };

  const paymentLabel: Record<string, string> = {
    transfer: t('cart.transfer'),
    card: t('cart.card'),
    cash: t('cart.cash'),
  };

  const handleSubmit = () => {
    setTried(true);
    if (!allValid) return;

    let msg = `🛒 *${en ? 'New Order' : 'Nuevo Pedido'} - Platano Loco*\n\n`;
    items.forEach((ci) => {
      const itemName = en ? ci.item.name.en : ci.item.name.es;
      msg += `• ${ci.quantity}x ${itemName} - ${formatPrice(ci.item.price * ci.quantity)}\n`;
    });
    msg += `\n💰 *Total: ${formatPrice(totalPrice)}*\n`;
    msg += `\n👤 ${name}`;
    msg += `\n${paymentEmoji[paymentMethod] || ''} ${paymentLabel[paymentMethod] || paymentMethod}`;

    if (orderType === 'dineIn') {
      msg += `\n📍 ${en ? 'Dine in' : 'En mesa'} / 🪑 Mesa ${localTable}`;
    } else {
      msg += `\n📍 ${en ? 'Delivery' : 'Domicilio'} / 🏠 ${address}`;
    }

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/573108992871?text=${encoded}`, '_blank');
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[59] bg-black/70" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-[60] w-full max-w-md overflow-y-auto bg-surface shadow-2xl">
        {/* Step 1 */}
        {step === 1 && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="text-lg font-bold text-white">{t('cart.title')}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <MdClose className="text-2xl" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-gray-500">
                {t('cart.empty')}
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  {items.map((ci) => (
                    <div
                      key={ci.item.id}
                      className="mb-3 flex items-center gap-3 rounded-xl bg-surface-light p-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">
                          {en ? ci.item.name.en : ci.item.name.es}
                        </p>
                        <p className="text-sm font-bold text-brand">
                          {formatPrice(ci.item.price * ci.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-border text-white"
                        >
                          <MdRemove />
                        </button>
                        <span className="w-6 text-center font-bold text-white">{ci.quantity}</span>
                        <button
                          onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-border text-white"
                        >
                          <MdAdd />
                        </button>
                        <button
                          onClick={() => removeItem(ci.item.id)}
                          className="ml-1 text-red-400 hover:text-red-300"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border p-4">
                  <div className="mb-3 flex justify-between text-lg font-bold text-white">
                    <span>{t('cart.total')}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full rounded-xl bg-brand py-3 font-bold text-black transition-colors hover:bg-brand-dark"
                  >
                    {t('cart.continue')}
                  </button>
                  <button
                    onClick={() => {
                      clearCart();
                      onClose();
                    }}
                    className="mt-3 w-full text-center text-sm text-red-400 hover:text-red-300"
                  >
                    {t('cart.deleteOrder')}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="text-lg font-bold text-white">{t('cart.step2Title')}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <MdClose className="text-2xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <form noValidate onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className={`mb-1 block text-sm font-medium ${tried && !nameValid ? 'text-red-400' : 'text-gray-300'}`}>
                    {t('cart.name')}
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('cart.namePlaceholder')}
                    className={`w-full rounded-xl border bg-surface-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors ${
                      tried && !nameValid ? 'border-red-500' : 'border-border focus:border-brand'
                    }`}
                  />
                  {tried && !nameValid && (
                    <p className="mt-1 text-xs text-red-400">{en ? 'Required' : 'Requerido'}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className={`mb-2 block text-sm font-medium ${tried && !paymentValid ? 'text-red-400' : 'text-gray-300'}`}>
                    {t('cart.paymentMethod')}
                  </label>
                  <div className="flex gap-2">
                    {(['transfer', 'card', 'cash'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                          paymentMethod === method
                            ? 'bg-brand text-black'
                            : `bg-surface-light text-gray-400 hover:text-white ${tried && !paymentValid ? 'border border-red-500/50' : 'border border-border'}`
                        }`}
                      >
                        {t(`cart.${method}`)}
                      </button>
                    ))}
                  </div>
                  {tried && !paymentValid && (
                    <p className="mt-1 text-xs text-red-400">{en ? 'Select a payment method' : 'Selecciona un método de pago'}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className={`mb-2 block text-sm font-medium ${tried && !orderTypeValid ? 'text-red-400' : 'text-gray-300'}`}>
                    {t('cart.orderType')}
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleOrderType('dineIn')}
                      className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                        orderType === 'dineIn'
                          ? 'bg-brand text-black'
                          : `bg-surface-light text-gray-400 hover:text-white ${tried && !orderTypeValid ? 'border border-red-500/50' : 'border border-border'}`
                      }`}
                    >
                      {t('cart.dineIn')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOrderType('delivery')}
                      className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                        orderType === 'delivery'
                          ? 'bg-brand text-black'
                          : `bg-surface-light text-gray-400 hover:text-white ${tried && !orderTypeValid ? 'border border-red-500/50' : 'border border-border'}`
                      }`}
                    >
                      {t('cart.delivery')}
                    </button>
                  </div>
                  {tried && !orderTypeValid && (
                    <p className="mt-1 text-xs text-red-400">{en ? 'Select order type' : 'Selecciona tipo de pedido'}</p>
                  )}
                </div>

                {orderType === 'dineIn' && (
                  <div className="mb-4">
                    {localTable ? (
                      <div className="flex items-center justify-between rounded-xl bg-brand px-4 py-3 text-black">
                        <div className="flex items-center gap-2">
                          <MdTableRestaurant />
                          <span className="font-bold">Mesa</span>
                          <span className="rounded-lg bg-black px-2 py-0.5 text-sm font-bold text-brand">
                            {localTable}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setLocalTable('')}
                          className="text-sm text-black/60 hover:text-black"
                        >
                          {t('cart.changeTable')}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-2 text-sm text-gray-400">{t('cart.selectTable')}</p>
                        <div className="grid grid-cols-5 gap-2">
                          {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setLocalTable(num)}
                              className="h-10 rounded-lg bg-brand/20 text-sm font-bold text-brand transition-colors hover:bg-brand/40"
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {tried && !tableValid && (
                      <p className="mt-1 text-xs text-red-400">{en ? 'Select a table' : 'Selecciona una mesa'}</p>
                    )}
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="mb-4">
                    <label className={`mb-1 block text-sm font-medium ${tried && !addressValid ? 'text-red-400' : 'text-gray-300'}`}>
                      {t('cart.address')}
                    </label>
                    <input
                      type="text"
                      autoComplete="street-address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t('cart.addressPlaceholder')}
                      className={`w-full rounded-xl border bg-surface-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors ${
                        tried && !addressValid ? 'border-red-500' : 'border-border focus:border-brand'
                      }`}
                    />
                    {tried && !addressValid && (
                      <p className="mt-1 text-xs text-red-400">{en ? 'Required' : 'Requerido'}</p>
                    )}
                  </div>
                )}

                <div className="mb-4 rounded-xl bg-surface-light p-4">
                  {items.map((ci) => (
                    <div key={ci.item.id} className="mb-1 flex justify-between text-sm text-gray-300">
                      <span>{ci.quantity}x {en ? ci.item.name.en : ci.item.name.es}</span>
                      <span className="font-bold text-white">{formatPrice(ci.item.price * ci.quantity)}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex justify-between border-t border-border pt-2 font-bold text-white">
                    <span>{t('cart.total')}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold transition-colors ${
                    allValid
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-brand/20 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <FaWhatsapp className="text-lg" />
                  {t('cart.sendWhatsApp')}
                </button>
                {tried && !allValid && (
                  <p className="mt-2 text-center text-sm text-red-400">{t('cart.completeFields')}</p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setTried(false);
                  }}
                  className="mt-3 w-full text-center text-sm text-gray-500 hover:text-gray-300"
                >
                  {t('cart.back')}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
