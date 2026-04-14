import { useState, useEffect, useRef, useCallback } from 'react';
import { MdTableRestaurant, MdClose, MdArrowBack, MdCameraAlt, MdCheckCircle } from 'react-icons/md';
import { useTable } from '../context/TableContext';
import { useTranslation } from 'react-i18next';

interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Mode = 'menu' | 'qr' | 'confirmed';

const isMobile = () =>
  /Android|iPhone|iPad|iPod|HarmonyOS|Huawei|HUAWEI/i.test(navigator.userAgent);

export default function TableModal({ isOpen, onClose }: TableModalProps) {
  const { tableNumber, setTableNumber, hasTable } = useTable();
  const { i18n } = useTranslation();
  const [mode, setMode] = useState<Mode>('menu');
  const [cameraError, setCameraError] = useState('');
  const scannerRef = useRef<unknown>(null);
  const en = i18n.language === 'en';

  useEffect(() => {
    if (isOpen) {
      setMode('menu');
      setCameraError('');
    }
  }, [isOpen]);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (scannerRef.current as any).stop();
      } catch {
        // ignore
      }
      scannerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (mode !== 'qr') {
      stopScanner();
      return;
    }

    let cancelled = false;

    const startScanner = async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        if (cancelled) return;

        const scanner = new Html5Qrcode('qr-reader');
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 200, height: 200 } },
          (decoded: string) => {
            let mesa = '';
            try {
              const url = new URL(decoded);
              const hash = url.hash;
              const qIdx = hash.indexOf('?');
              if (qIdx >= 0) {
                const params = new URLSearchParams(hash.substring(qIdx));
                mesa = params.get('mesa') || '';
              }
            } catch {
              const num = parseInt(decoded, 10);
              if (num >= 1 && num <= 10) mesa = String(num);
            }

            if (mesa && parseInt(mesa, 10) >= 1 && parseInt(mesa, 10) <= 10) {
              scanner.stop().then(() => {
                scannerRef.current = null;
                setTableNumber(mesa);
                setMode('confirmed');
              });
            }
          },
          () => {}
        );
      } catch {
        if (!cancelled) setCameraError(en ? 'Could not access camera' : 'No se pudo acceder a la cámara');
      }
    };

    startScanner();

    return () => {
      cancelled = true;
      stopScanner();
    };
  }, [mode, en, setTableNumber, stopScanner]);

  useEffect(() => {
    if (mode === 'confirmed') {
      const timer = setTimeout(() => onClose(), 2000);
      return () => clearTimeout(timer);
    }
  }, [mode, onClose]);

  if (!isOpen) return null;

  if (mode === 'confirmed') {
    return (
      <div className="animate-fade-in fixed inset-0 z-[80] flex items-center justify-center bg-black/90">
        <div className="text-center">
          <MdCheckCircle className="mx-auto text-brand" style={{ fontSize: 72 }} />
          <p className="mt-4 text-sm uppercase tracking-widest text-white/60">
            {en ? 'Table assigned' : 'Mesa asignada'}
          </p>
          <p className="mt-2 text-5xl font-bold text-white md:text-7xl">
            {tableNumber}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-[90%] max-w-sm rounded-2xl bg-surface p-6">
        {mode === 'menu' && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <MdTableRestaurant className="text-xl text-brand" />
                <h3 className="text-lg font-bold">
                  {en ? 'Select your table' : 'Selecciona tu mesa'}
                </h3>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <MdClose className="text-xl" />
              </button>
            </div>

            {hasTable && (
              <p className="mb-4 text-center text-sm text-gray-400">
                {en ? 'Currently at Table' : 'Actualmente en Mesa'}{' '}
                <span className="text-2xl font-bold text-brand">{tableNumber}</span>
              </p>
            )}

            <div className="mb-4 grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setTableNumber(num);
                    onClose();
                  }}
                  className={`h-12 rounded-xl text-lg font-bold transition-colors ${
                    tableNumber === num
                      ? 'bg-brand text-black'
                      : 'bg-brand/20 text-brand/70 hover:bg-brand/40'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {isMobile() && (
              <button
                onClick={() => setMode('qr')}
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-surface-light px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-border"
              >
                <MdCameraAlt className="text-lg text-brand" />
                <div className="text-left">
                  <div>{en ? 'Scan QR code' : 'Escanear código QR'}</div>
                  <div className="text-xs text-gray-500">
                    {en ? 'Use your camera' : 'Usa tu cámara'}
                  </div>
                </div>
              </button>
            )}

            {hasTable && (
              <button
                onClick={() => {
                  setTableNumber('');
                  onClose();
                }}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-300"
              >
                {en ? 'Remove table' : 'Quitar mesa'}
              </button>
            )}
          </>
        )}

        {mode === 'qr' && (
          <>
            <div className="mb-4 flex items-center gap-2 text-white">
              <button onClick={() => setMode('menu')} className="text-gray-400 hover:text-white">
                <MdArrowBack className="text-xl" />
              </button>
              <h3 className="text-lg font-bold">
                {en ? 'Scan QR' : 'Escanear QR'}
              </h3>
            </div>

            <div className="aspect-square overflow-hidden rounded-xl bg-black">
              <div id="qr-reader" className="h-full w-full" />
            </div>

            {cameraError && (
              <p className="mt-3 text-center text-sm text-red-400">{cameraError}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
