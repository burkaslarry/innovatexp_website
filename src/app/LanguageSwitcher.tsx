"use client"
import React from 'react';
import { useLanguage } from './LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          language === 'en'
            ? 'bg-blue-600 text-white font-semibold'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('zh')}
        className={`px-3 py-1 rounded-md transition-all duration-200 ${
          language === 'zh'
            ? 'bg-blue-600 text-white font-semibold'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        繁中
      </button>
    </div>
  );
}


