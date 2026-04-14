import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface TableContextType {
  tableNumber: string;
  setTableNumber: (num: string) => void;
  hasTable: boolean;
}

const TableContext = createContext<TableContextType | null>(null);

function getTableFromHash(): string {
  const hash = window.location.hash;
  const qIdx = hash.indexOf('?');
  if (qIdx === -1) return '';
  const params = new URLSearchParams(hash.substring(qIdx));
  return params.get('mesa') || '';
}

function updateHashParams(key: string, value: string | null) {
  const hash = window.location.hash;
  const hashIdx = hash.indexOf('#');
  const base = hashIdx >= 0 ? hash.substring(hashIdx) : '#/';
  const qIdx = base.indexOf('?');
  const path = qIdx >= 0 ? base.substring(0, qIdx) : base;
  const params = new URLSearchParams(qIdx >= 0 ? base.substring(qIdx) : '');

  if (value === null) {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  const qs = params.toString();
  const newHash = qs ? `${path}?${qs}` : path;
  window.history.replaceState(null, '', newHash);
}

export function TableProvider({ children }: { children: ReactNode }) {
  const [tableNumber, setTableNumberState] = useState(() => getTableFromHash());

  const setTableNumber = useCallback((num: string) => {
    setTableNumberState(num);
    if (num) {
      updateHashParams('mesa', num);
    } else {
      updateHashParams('mesa', null);
    }
  }, []);

  useEffect(() => {
    const handleChange = () => {
      const mesa = getTableFromHash();
      setTableNumberState(mesa);
    };

    window.addEventListener('hashchange', handleChange);
    window.addEventListener('popstate', handleChange);

    const interval = setInterval(() => {
      const mesa = getTableFromHash();
      setTableNumberState((prev) => (prev !== mesa ? mesa : prev));
    }, 1000);

    return () => {
      window.removeEventListener('hashchange', handleChange);
      window.removeEventListener('popstate', handleChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <TableContext.Provider
      value={{ tableNumber, setTableNumber, hasTable: !!tableNumber }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error('useTable must be inside TableProvider');
  return ctx;
}
