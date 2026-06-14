"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Lang = "ar" | "en";

type LangContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  toggleLang: () => void;
  t: (ar: string, en: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      toggleLang,
      t: (ar, en) => (lang === "ar" ? ar : en),
    }),
    [lang, toggleLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
