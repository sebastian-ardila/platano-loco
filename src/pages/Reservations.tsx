import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MdCalendarToday, MdSchedule, MdLocationOn } from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';
import { FaWhatsapp } from 'react-icons/fa';
import CTASection from '../components/CTASection';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Platano+Loco/@4.803436,-75.6982298,17.96z/data=!4m6!3m5!1s0x8e38870047628919:0x3d69742a5cd24002!8m2!3d4.8036195!4d-75.6971301!16s%2Fg%2F11xt2y_jq1';

const OPEN_HOUR = 16;
const OPEN_MIN = 30;
const CLOSE_HOUR = 22;

function generateTimeSlots(date: string) {
  if (!date) return null;
  const slots: string[] = [];
  let h = OPEN_HOUR;
  let m = OPEN_MIN;
  while (h < CLOSE_HOUR || (h === CLOSE_HOUR && m === 0)) {
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    slots.push(time);
    m += 30;
    if (m >= 60) { m = 0; h++; }
  }
  const morning = slots.filter((s) => parseInt(s) < 12);
  const afternoon = slots.filter((s) => parseInt(s) >= 12 && parseInt(s) < 18);
  const evening = slots.filter((s) => parseInt(s) >= 18);
  return { morning, afternoon, evening };
}

function formatDateReadable(dateStr: string, lang: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
}

export default function Reservations() {
  const { t, i18n } = useTranslation();
  const en = i18n.language === 'en';
  const dateRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comments, setComments] = useState('');
  const [tried, setTried] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const slots = generateTimeSlots(date);

  const nameValid = name.trim().length > 0;
  const dateValid = date.length > 0 && slots !== null;
  const timeValid = time.length > 0;
  const allValid = nameValid && dateValid && timeValid;

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    const newSlots = generateTimeSlots(newDate);
    if (newSlots) {
      const allTimes = [...newSlots.morning, ...newSlots.afternoon, ...newSlots.evening];
      if (!allTimes.includes(time)) setTime('');
    } else { setTime(''); }
  };

  const handleSubmit = () => {
    setTried(true);
    if (!allValid) return;
    const dateFormatted = formatDateReadable(date, i18n.language);
    let msg = `📋 *${en ? 'Table Reservation' : 'Reserva de Mesa'} - Platano Loco*\n\n`;
    msg += `👤 ${name}\n👥 ${people} ${en ? 'guests' : 'personas'}\n📅 ${dateFormatted}\n🕐 ${time}\n`;
    if (comments.trim()) msg += `💬 ${comments}\n`;
    window.open(`https://wa.me/573108992871?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-white">{t('reservations.title')}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-1">
          <div className="rounded-2xl bg-surface p-6">
            <div className="mb-3 flex items-center gap-2">
              <MdSchedule className="text-xl text-brand" />
              <h3 className="font-bold text-white">{t('schedule.hours')}</h3>
            </div>
            <p className="text-sm text-gray-400">{t('scheduleData.monSun')}</p>
          </div>

          <div className="rounded-2xl bg-surface p-6">
            <div className="mb-3 flex items-center gap-2">
              <MdLocationOn className="text-xl text-brand" />
              <h3 className="font-bold text-white">{t('schedule.location')}</h3>
            </div>
            <p className="mb-4 text-sm text-gray-400">Cl. 21 Bis #21-20, Pereira, Risaralda</p>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-surface-light px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-border">
              <SiGooglemaps className="text-red-400" /> {t('schedule.googleMaps')}
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <form noValidate onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Nombre + Personas lado a lado */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={`mb-1 block text-sm font-medium ${tried && !nameValid ? 'text-red-400' : 'text-gray-300'}`}>
                  {t('reservations.name')}
                </label>
                <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder={t('reservations.namePlaceholder')}
                  className={`w-full rounded-xl border bg-surface-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors ${
                    tried && !nameValid ? 'border-red-500' : 'border-border focus:border-brand'}`} />
                {tried && !nameValid && <p className="mt-1 text-xs text-red-400">{t('reservations.required')}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">{t('reservations.people')}</label>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-surface-light px-4 py-2">
                  <button type="button" onClick={() => setPeople(Math.max(1, people - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-border text-lg font-bold text-white transition-colors hover:bg-gray-500">-</button>
                  <span className="text-2xl font-bold text-white">{people}</span>
                  <button type="button" onClick={() => setPeople(people + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-border text-lg font-bold text-white transition-colors hover:bg-gray-500">+</button>
                </div>
              </div>
            </div>

            {/* Fecha + Hora lado a lado */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className={`mb-1 block text-sm font-medium ${tried && !dateValid ? 'text-red-400' : 'text-gray-300'}`}>
                  {t('reservations.date')}
                </label>
                <input ref={dateRef} type="date" min={today} value={date} onChange={(e) => handleDateChange(e.target.value)} className="sr-only" />
                <button type="button" onClick={() => dateRef.current?.showPicker()}
                  className={`flex w-full items-center gap-2 rounded-xl border px-4 py-3 text-left transition-colors ${
                    tried && !dateValid ? 'border-red-500' : date ? 'border-brand bg-brand/10' : 'border-border hover:border-gray-500'}`}>
                  <MdCalendarToday className="text-lg text-gray-500" />
                  <span className={date ? 'font-medium text-white' : 'text-gray-500'}>
                    {date ? formatDateReadable(date, i18n.language) : t('reservations.selectDate')}
                  </span>
                </button>
                {tried && !dateValid && <p className="mt-1 text-xs text-red-400">{t('reservations.required')}</p>}
              </div>
            </div>

            <div>
              <label className={`mb-1 block text-sm font-medium ${tried && !timeValid ? 'text-red-400' : 'text-gray-300'}`}>
                {t('reservations.time')}
              </label>
              {!date ? (
                <button type="button" onClick={() => dateRef.current?.showPicker()}
                  className="rounded-xl border border-border px-4 py-3 text-sm text-gray-500">
                  {t('reservations.selectDateFirst')}
                </button>
              ) : slots ? (
                <div className="space-y-4">
                  {slots.evening.length > 0 && (
                    <div>
                      <p className="mb-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                        🌙 {t('reservations.evening')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {slots.evening.map((s) => (
                          <button key={s} type="button" onClick={() => setTime(s)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              time === s ? 'border-2 border-brand bg-brand/15 font-bold text-brand' : 'border border-border text-gray-400 hover:border-gray-500 hover:text-white'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {slots.afternoon.length > 0 && (
                    <div>
                      <p className="mb-2 flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                        ☀️ {t('reservations.afternoon')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {slots.afternoon.map((s) => (
                          <button key={s} type="button" onClick={() => setTime(s)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              time === s ? 'border-2 border-brand bg-brand/15 font-bold text-brand' : 'border border-border text-gray-400 hover:border-gray-500 hover:text-white'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
              {tried && !timeValid && <p className="mt-1 text-xs text-red-400">{t('reservations.required')}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">{t('reservations.comments')}</label>
              <textarea value={comments} onChange={(e) => setComments(e.target.value)}
                placeholder={t('reservations.commentsPlaceholder')} rows={3}
                className="w-full rounded-xl border border-border bg-surface-light px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-brand" />
            </div>

            <button type="button" onClick={handleSubmit}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold transition-colors ${
                allValid ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-brand/20 text-white/30 cursor-not-allowed'}`}>
              <FaWhatsapp className="text-lg" /> {t('reservations.submit')}
            </button>
            {tried && !allValid && <p className="text-center text-sm text-red-400">{t('reservations.completeFields')}</p>}
          </form>
        </div>
      </div>

      <CTASection secondaryLabel={en ? 'Contact' : 'Contactar'} secondaryHref="/contacto" />
    </div>
  );
}
