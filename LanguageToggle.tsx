
import React from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<Props> = ({ lang, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(lang === 'ar' ? 'en' : 'ar')}
      className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium transition-colors"
    >
      {lang === 'ar' ? 'English' : 'عربي'}
    </button>
  );
};
