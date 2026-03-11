import React from 'react';
import { LangToggle } from './LangToggle';
import { translations, type Lang } from './translations';

type Props = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  onComplete: () => void;
};

export const OnboardingScreen: React.FC<Props> = ({ lang, setLang, onComplete }) => {
  const t = translations[lang].onboarding;
  const logoSrc = new URL('../logo-full-preview-2.png', import.meta.url).href;
  return (
    <div className="gm-screen gm-onboarding-screen">
      <div className="gm-header-row">
        <LangToggle lang={lang} setLang={setLang} />
      </div>
      <h1 className="gm-title gm-onboarding-title">{t.title}</h1>
      <p className="gm-subtitle gm-onboarding-subtitle">{t.subtitle}</p>

      <div className="gm-card gm-onboarding-card">
        <div className="gm-card-row">
          <span className="gm-label">{t.bullet1}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{t.bullet2}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{t.bullet3}</span>
        </div>
      </div>

      <div className="gm-onboarding-logo">
        <img src={logoSrc} alt="Faceit logo" />
      </div>

      <div className="gm-actions gm-onboarding-actions">
        <button className="gm-button" onClick={onComplete}>
          {t.start}
        </button>
      </div>
    </div>
  );
};
