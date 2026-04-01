import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pyl_lang';
export const DEFAULT_LANG = 'es';
export const LANGUAGES = ['es', 'en', 'pt'];

export function useLanguage() {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; }
    catch { return DEFAULT_LANG; }
  });

  useEffect(() => {
    const handler = (e) => setLangState(e.detail);
    window.addEventListener('pyl_lang_change', handler);
    return () => window.removeEventListener('pyl_lang_change', handler);
  }, []);

  const setLang = (newLang) => {
    try { localStorage.setItem(STORAGE_KEY, newLang); } catch {}
    window.dispatchEvent(new CustomEvent('pyl_lang_change', { detail: newLang }));
  };

  return { lang, setLang };
}