import React, { useState, ChangeEvent } from 'react';
import { LangToggle } from './LangToggle';
import { translations, type Lang } from './translations';

type Props = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  onComplete: () => void;
};

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const OnboardingScreen: React.FC<Props> = ({ lang, setLang, onComplete }) => {
  const [step, setStep] = useState<Step>(0);
  const [role, setRole] = useState<string | null>(null);
  const [elo, setElo] = useState('');
  const [languagePref, setLanguagePref] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [profileLink, setProfileLink] = useState('');

  const t = translations[lang].onboarding;

  const next = () => {
    setStep((current) => (current < 6 ? ((current + 1) as Step) : current));
  };

  const handleEloChange = (event: ChangeEvent<HTMLInputElement>) => {
    setElo(event.target.value);
  };

  const handleProfileLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileLink(event.target.value);
  };

  const stepLabel =
    step === 0
      ? ''
      : lang === 'ru'
      ? `Шаг ${step} из 6`
      : `Step ${step} of 6`;

  if (step === 0) {
    return (
      <div className="gm-screen gm-onboarding-screen">
        <div className="gm-header-row">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div className="gm-onboarding-hero">
          <h1 className="gm-title gm-onboarding-title">{t.title}</h1>
          <p className="gm-subtitle gm-onboarding-subtitle">{t.subtitle}</p>

          <div className="gm-onboarding-tags">
            <span className="gm-onboarding-tag">{t.bullet1}</span>
            <span className="gm-onboarding-tag">{t.bullet2}</span>
            <span className="gm-onboarding-tag">{t.bullet3}</span>
          </div>
        </div>

        <div className="gm-actions gm-onboarding-actions">
          <button className="gm-button" onClick={next}>
            {t.start}
          </button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="gm-screen gm-onboarding-screen">
        <div className="gm-header-row">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div className="gm-onboarding-step">
          <p className="gm-step-label">{stepLabel}</p>
          <h2 className="gm-step-title">{t.roleTitle}</h2>
          <p className="gm-step-subtitle">{t.roleSubtitle}</p>

          <div className="gm-option-list">
            {(['entry', 'support', 'sniper', 'flexible'] as const).map((key) => (
              <button
                key={key}
                type="button"
                className={
                  role === key ? 'gm-option gm-option-active' : 'gm-option'
                }
                onClick={() => {
                  setRole(key);
                  next();
                }}
              >
                {t.roles[key]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="gm-screen gm-onboarding-screen">
        <div className="gm-header-row">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div className="gm-onboarding-step">
          <p className="gm-step-label">{stepLabel}</p>
          <h2 className="gm-step-title">{t.eloTitle}</h2>
          <p className="gm-step-subtitle">{t.eloSubtitle}</p>

          <input
            type="number"
            className="gm-input"
            value={elo}
            onChange={handleEloChange}
            placeholder={t.eloPlaceholder}
          />

          <div className="gm-actions gm-step-actions">
            <button className="gm-button" type="button" onClick={next}>
              {lang === 'ru' ? 'Далее' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="gm-screen gm-onboarding-screen">
        <div className="gm-header-row">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div className="gm-onboarding-step">
          <p className="gm-step-label">{stepLabel}</p>
          <h2 className="gm-step-title">{t.languageTitle}</h2>
          <p className="gm-step-subtitle">{t.languageSubtitle}</p>

          <div className="gm-option-list">
            {(['ru', 'en', 'both'] as const).map((key) => (
              <button
                key={key}
                type="button"
                className={
                  languagePref === key
                    ? 'gm-option gm-option-active'
                    : 'gm-option'
                }
                onClick={() => {
                  setLanguagePref(key);
                  next();
                }}
              >
                {t.languages[key]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="gm-screen gm-onboarding-screen">
        <div className="gm-header-row">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div className="gm-onboarding-step">
          <p className="gm-step-label">{stepLabel}</p>
          <h2 className="gm-step-title">{t.goalTitle}</h2>
          <p className="gm-step-subtitle">{t.goalSubtitle}</p>

          <div className="gm-option-list">
            {(['climb', 'stackTonight', 'chill', 'serious'] as const).map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  className={
                    goal === key ? 'gm-option gm-option-active' : 'gm-option'
                  }
                  onClick={() => {
                    setGoal(key);
                    next();
                  }}
                >
                  {t.goals[key]}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="gm-screen gm-onboarding-screen">
        <div className="gm-header-row">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div className="gm-onboarding-step">
          <p className="gm-step-label">{stepLabel}</p>
          <h2 className="gm-step-title">{t.linkTitle}</h2>
          <p className="gm-step-subtitle">{t.linkSubtitle}</p>

          <input
            type="url"
            className="gm-input"
            value={profileLink}
            onChange={handleProfileLinkChange}
            placeholder={t.linkPlaceholder}
          />

          <div className="gm-actions gm-step-actions">
            <button
              className="gm-button-secondary"
              type="button"
              onClick={next}
            >
              {lang === 'ru' ? 'Пропустить' : 'Skip'}
            </button>
            <button className="gm-button" type="button" onClick={next}>
              {lang === 'ru' ? 'Далее' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // step === 6
  return (
    <div className="gm-screen gm-onboarding-screen">
      <div className="gm-header-row">
        <LangToggle lang={lang} setLang={setLang} />
      </div>
      <div className="gm-onboarding-step">
        <h2 className="gm-step-title">{t.finishTitle}</h2>
        <p className="gm-step-subtitle">{t.finishSubtitle}</p>

        <div className="gm-actions gm-step-actions">
          <button className="gm-button" type="button" onClick={onComplete}>
            {t.finishCta}
          </button>
        </div>
      </div>
    </div>
  );
};
