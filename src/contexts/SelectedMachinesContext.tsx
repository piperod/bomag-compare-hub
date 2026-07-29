import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const storageKey = (line: string) => `selectedMachines:${line}`;

function readLineSelection(line: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(storageKey(line));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function writeLineSelection(line: string, ids: string[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(storageKey(line), JSON.stringify(ids));
  } catch {
    // ignore quota / private mode errors
  }
}

type SelectedMachinesContextValue = {
  getSelectedMachines: (line: string) => string[];
  setSelectedMachinesForLine: (
    line: string,
    value: string[] | ((prev: string[]) => string[])
  ) => void;
};

const SelectedMachinesContext = createContext<SelectedMachinesContextValue | undefined>(
  undefined
);

export function SelectedMachinesProvider({ children }: { children: ReactNode }) {
  const [byLine, setByLine] = useState<Record<string, string[]>>(() => ({
    sdr: readLineSelection('sdr'),
    ltr: readLineSelection('ltr'),
    htr: readLineSelection('htr'),
  }));
  const readyRef = useRef(true);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (!e.key || !e.key.startsWith('selectedMachines:')) return;
      const line = e.key.slice('selectedMachines:'.length);
      setByLine((prev) => ({ ...prev, [line]: readLineSelection(line) }));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const getSelectedMachines = useCallback(
    (line: string) => byLine[line] ?? [],
    [byLine]
  );

  const setSelectedMachinesForLine = useCallback(
    (line: string, value: string[] | ((prev: string[]) => string[])) => {
      setByLine((prev) => {
        const current = prev[line] ?? [];
        const next = typeof value === 'function' ? value(current) : value;
        if (readyRef.current) writeLineSelection(line, next);
        return { ...prev, [line]: next };
      });
    },
    []
  );

  const value = useMemo(
    () => ({ getSelectedMachines, setSelectedMachinesForLine }),
    [getSelectedMachines, setSelectedMachinesForLine]
  );

  return (
    <SelectedMachinesContext.Provider value={value}>
      {children}
    </SelectedMachinesContext.Provider>
  );
}

export function useSelectedMachines(line: string) {
  const ctx = useContext(SelectedMachinesContext);
  if (!ctx) {
    throw new Error('useSelectedMachines must be used within SelectedMachinesProvider');
  }

  const selectedMachines = ctx.getSelectedMachines(line);
  const setSelectedMachines = useCallback(
    (value: string[] | ((prev: string[]) => string[])) => {
      ctx.setSelectedMachinesForLine(line, value);
    },
    [ctx, line]
  );

  return { selectedMachines, setSelectedMachines };
}

export function useSelectedMachinesForLine(line: string): string[] {
  const ctx = useContext(SelectedMachinesContext);
  if (!ctx) {
    throw new Error('useSelectedMachinesForLine must be used within SelectedMachinesProvider');
  }
  return ctx.getSelectedMachines(line);
}
