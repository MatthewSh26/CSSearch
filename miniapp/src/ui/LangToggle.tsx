import React from 'react';
import type { Lang } from './translations';

type Props = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const LangToggle: React.FC<Props> = ({ lang, setLang }) => {
  return (
    <div className="gm-lang-switch">
      <button
        type="button"
        className={lang === 'ru' ? 'gm-lang-option gm-lang-active' : 'gm-lang-option'}
        onClick={() => setLang('ru')}
        aria-label="Russian"
      >
        RU
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'gm-lang-option gm-lang-active' : 'gm-lang-option'}
        onClick={() => setLang('en')}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
