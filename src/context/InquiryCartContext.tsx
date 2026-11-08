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
  addItem: (id: InquiryCatalogItemId, opts?: { title?: string; invitation?: string }) => void;
  invitations: Partial<Record<InquiryCatalogItemId, string>>;
  removeItem: (id: InquiryCatalogItemId) => void;
  setQty: (id: InquiryCatalogItemId, qty: number) => void;
  clear: () => void;
  lastAddedId: string | null;
};

const InquiryCartContext = createContext<InquiryCartContextValue | null>(null);

export function normalizeCart(value: unknown): InquiryCartLine[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.flatMap((line) => {
    if (!line || typeof line.id !== "string" || !Number.isInteger(line.qty) || line.qty < 1 || seen.has(line.id)) return [];
    const catalog = getInquiryCatalogItem(line.id);
    if (!catalog) return [];
    seen.add(line.id);
    return [{ id: catalog.id, title: catalog.titleEn, amountHkd: catalog.hidePublicPrice ? 0 : catalog.amountHkd, qty: Math.min(line.qty, 9) }];
  });
}

function readStored(): InquiryCartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return normalizeCart(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return [];
  }
}

export function InquiryCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryCartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [invitations, setInvitations] = useState<Partial<Record<InquiryCatalogItemId, string>>>({});

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
    (id: InquiryCatalogItemId, opts?: { title?: string; invitation?: string }) => {
      const catalog = getInquiryCatalogItem(id);
      if (!catalog) return;
      const title = opts?.title ?? catalog.titleEn;
      const amountHkd = catalog.hidePublicPrice ? 0 : catalog.amountHkd;
      if (opts?.invitation) setInvitations((previous) => ({ ...previous, [id]: opts.invitation }));
      setItems((prev) => {
        const existing = prev.find((line) => line.id === id);
        if (existing) {
          return prev.map((line) =>
            line.id === id ? { ...line, qty: opts?.invitation ? 1 : Math.min(line.qty + 1, 9) } : line,
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
    setInvitations((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
  }, []);

  const setQty = useCallback((id: InquiryCatalogItemId, qty: number) => {
    const next = Math.max(0, Math.min(9, Math.floor(qty)));
    if (next <= 0) { removeItem(id); return; }
    setItems((prev) => prev.map((line) => (line.id === id ? { ...line, qty: next } : line)));
  }, [removeItem]);

  const clear = useCallback(() => { setItems([]); setInvitations({}); }, []);

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
      invitations,
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
      invitations,
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
