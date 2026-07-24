"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getInquiryCatalogItem,
  type InquiryCatalogItemId,
} from "@/content/inquiry-catalog";

const STORAGE_KEY = "innovatexp-inquiry-cart-v1";

export type InquiryCartLine = {
  id: InquiryCatalogItemId;
  title: string;
  amountHkd: number;
  qty: number;
};

type InquiryCartContextValue = {
  items: InquiryCartLine[];
  itemCount: number;
  estimatedTotal: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addItem: (id: InquiryCatalogItemId, opts?: { title?: string; amountHkd?: number }) => void;
  removeItem: (id: InquiryCatalogItemId) => void;
  setQty: (id: InquiryCatalogItemId, qty: number) => void;
  clear: () => void;
  lastAddedId: string | null;
};

const InquiryCartContext = createContext<InquiryCartContextValue | null>(null);

function readStored(): InquiryCartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as InquiryCartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        line &&
        typeof line.id === "string" &&
        typeof line.title === "string" &&
        typeof line.amountHkd === "number" &&
        typeof line.qty === "number" &&
        line.qty > 0,
    );
  } catch {
    return [];
  }
}

export function InquiryCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryCartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  useEffect(() => {
    setItems(readStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota */
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (id: InquiryCatalogItemId, opts?: { title?: string; amountHkd?: number }) => {
      const catalog = getInquiryCatalogItem(id);
      const title = opts?.title ?? catalog?.titleEn ?? id;
      const amountHkd = opts?.amountHkd ?? catalog?.amountHkd ?? 0;
      setItems((prev) => {
        const existing = prev.find((line) => line.id === id);
        if (existing) {
          return prev.map((line) =>
            line.id === id ? { ...line, qty: Math.min(line.qty + 1, 9) } : line,
          );
        }
        return [...prev, { id, title, amountHkd, qty: 1 }];
      });
      setLastAddedId(id);
      setDrawerOpen(true);
    },
    [],
  );

  const removeItem = useCallback((id: InquiryCatalogItemId) => {
    setItems((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const setQty = useCallback((id: InquiryCatalogItemId, qty: number) => {
    const next = Math.max(0, Math.min(9, Math.floor(qty)));
    setItems((prev) => {
      if (next <= 0) return prev.filter((line) => line.id !== id);
      return prev.map((line) => (line.id === id ? { ...line, qty: next } : line));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => items.reduce((sum, line) => sum + line.qty, 0), [items]);
  const estimatedTotal = useMemo(
    () => items.reduce((sum, line) => sum + line.amountHkd * line.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      estimatedTotal,
      drawerOpen,
      setDrawerOpen,
      addItem,
      removeItem,
      setQty,
      clear,
      lastAddedId,
    }),
    [
      items,
      itemCount,
      estimatedTotal,
      drawerOpen,
      addItem,
      removeItem,
      setQty,
      clear,
      lastAddedId,
    ],
  );

  return <InquiryCartContext.Provider value={value}>{children}</InquiryCartContext.Provider>;
}

export function useInquiryCart(): InquiryCartContextValue {
  const ctx = useContext(InquiryCartContext);
  if (!ctx) {
    throw new Error("useInquiryCart must be used within InquiryCartProvider");
  }
  return ctx;
}
