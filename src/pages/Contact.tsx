import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import CTASection from '../components/CTASection';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [tried, setTried] = useState(false);

  const nameValid = name.trim().length > 0;
  const emailValid = email.trim().length > 0 && email.includes('@');
  const reasonValid = reason.length > 0;
  const messageValid = message.trim().length > 0;
  const allValid = nameValid && emailValid && reasonValid && messageValid;

  const reasons = [
    { value: 'franchise', label: t('contact.reasons.franchise') },
    { value: 'supplier', label: t('contact.reasons.supplier') },
    { value: 'collaboration', label: t('contact.reasons.collaboration') },
    { value: 'events', label: t('contact.reasons.events') },
    { value: 'birthday', label: t('contact.reasons.birthday') },
    { value: 'other', label: t('contact.reasons.other') },
  ];

  const handleSubmit = () => {
    setTried(true);
    if (!allValid) return;
    const selectedReason = reasons.find((r) => r.value === reason)?.label || reason;
    let msg = `📩 *${en ? 'Contact' : 'Contacto'} - Platano Loco*\n\n`;
    msg += `👤 ${name}\n📧 ${email}\n`;
    if (phone.trim()) msg += `📞 ${phone}\n`;
    msg += `📋 ${selectedReason}\n\n💬 ${message}`;
    window.open(`https://wa.me/573108992871?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const inputClass = (valid: boolean) =>
    `w-full rounded-xl border bg-surface-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors ${
      tried && !valid ? 'border-red-500' : 'border-border focus:border-brand'
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-white">{t('contact.title')}</h1>

      <form noValidate onSubmit={(e) => e.preventDefault()} className="space-y-5">
        {/* Nombre y Email lado a lado en desktop */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className={`mb-1 block text-sm font-medium ${tried && !nameValid ? 'text-red-400' : 'text-gray-300'}`}>
              {t('contact.name')}
            </label>
            <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)}
              placeholder={t('contact.namePlaceholder')} className={inputClass(nameValid)} />
            {tried && !nameValid && <p className="mt-1 text-xs text-red-400">{en ? 'Required' : 'Requerido'}</p>}
          </div>

          <div>
            <label className={`mb-1 block text-sm font-medium ${tried && !emailValid ? 'text-red-400' : 'text-gray-300'}`}>
              {t('contact.email')}
            </label>
            <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={t('contact.emailPlaceholder')} className={inputClass(emailValid)} />
            {tried && !emailValid && <p className="mt-1 text-xs text-red-400">{en ? 'Valid email required' : 'Email válido requerido'}</p>}
          </div>
        </div>

        {/* Teléfono y Motivo lado a lado en desktop */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">{t('contact.phone')}</label>
            <input type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder={t('contact.phonePlaceholder')}
              className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-brand" />
          </div>

          <div>
            <label className={`mb-1 block text-sm font-medium ${tried && !reasonValid ? 'text-red-400' : 'text-gray-300'}`}>
              {t('contact.reason')}
            </label>
            <select value={reason} onChange={(e) => setReason(e.target.value)}
              className={`w-full rounded-xl border bg-surface-light px-4 py-3 outline-none transition-colors ${
                tried && !reasonValid ? 'border-red-500' : 'border-border focus:border-brand'
              } ${!reason ? 'text-gray-500' : 'text-white'}`}>
              <option value="">{t('contact.reasonPlaceholder')}</option>
              {reasons.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            {tried && !reasonValid && <p className="mt-1 text-xs text-red-400">{en ? 'Required' : 'Requerido'}</p>}
          </div>
        </div>

        {/* Mensaje full width */}
        <div>
          <label className={`mb-1 block text-sm font-medium ${tried && !messageValid ? 'text-red-400' : 'text-gray-300'}`}>
            {t('contact.message')}
          </label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder={t('contact.messagePlaceholder')} rows={4} className={inputClass(messageValid)} />
          {tried && !messageValid && <p className="mt-1 text-xs text-red-400">{en ? 'Required' : 'Requerido'}</p>}
        </div>

        <button type="button" onClick={handleSubmit}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold transition-colors ${
            allValid ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-brand/20 text-white/30 cursor-not-allowed'}`}>
          <FaWhatsapp className="text-lg" /> {t('contact.submit')}
        </button>
        {tried && !allValid && <p className="text-center text-sm text-red-400">{t('contact.completeFields')}</p>}
      </form>

      <CTASection secondaryLabel={en ? 'Reserve' : 'Reservar'} secondaryHref="/reservas" />
    </div>
  );
}
