import React, { useState, ChangeEvent } from 'react';
import { LangToggle } from './LangToggle';
import { translations, type Lang } from './translations';
import type {
  Mode,
  GameGoalKey,
  LanguagePref,
  UserProfile,
} from './profileTypes';

type Props = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  onComplete: (profile: UserProfile) => void;
};

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const OnboardingScreen: React.FC<Props> = ({ lang, setLang, onComplete }) => {
  const [step, setStep] = useState<Step>(0);
  const [mode, setMode] = useState<Mode | null>(null);
  const [goal, setGoal] = useState<GameGoalKey | null>(null);
  const [ratingValue, setRatingValue] = useState('');
  const [languagePref, setLanguagePref] = useState<LanguagePref | null>(null);
  const [telegram, setTelegram] = useState('');
  const [ratingError, setRatingError] = useState<string | null>(null);
  const [telegramError, setTelegramError] = useState<string | null>(null);

  const t = translations[lang].onboarding;

  const totalSteps = 5;

  const stepLabel =
    step === 0 || step === 6
      ? ''
      : lang === 'ru'
      ? `Шаг ${step} из ${totalSteps}`
      : `Step ${step} of ${totalSteps}`;

  if (step === 0) {
    return (
      <div className="gm-screen gm-onboarding-screen">
        <div className="gm-header-row">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div className="gm-onboarding-hero">
          <h1 className="gm-title gm-onboarding-title">{t.title}</h1>
          <p className="gm-subtitle gm-onboarding-subtitle">{t.subtitle}</p>

          <div className="gm-onboarding-benefits">
            <span className="gm-onboarding-benefit">{t.bullet1}</span>
            <span className="gm-onboarding-dot" aria-hidden="true">
              •
            </span>
            <span className="gm-onboarding-benefit">{t.bullet2}</span>
            <span className="gm-onboarding-dot" aria-hidden="true">
              •
            </span>
            <span className="gm-onboarding-benefit">{t.bullet3}</span>
          </div>
        </div>

        <div className="gm-actions gm-onboarding-actions">
          <button
            className="gm-button"
            onClick={() => setStep(1)}
            type="button"
          >
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
          <h2 className="gm-step-title">{t.modeTitle}</h2>
          <p className="gm-step-subtitle">{t.modeSubtitle}</p>

          <div className="gm-option-list">
            {(['faceit', 'mm', 'fun'] as Mode[]).map((key) => (
              <button
                key={key}
                type="button"
                className={
                  mode === key ? 'gm-option gm-option-active' : 'gm-option'
                }
                onClick={() => {
                  setMode(key);
                  if (key === 'fun') {
                    setStep(4);
                  } else {
                    setStep(2);
                  }
                }}
              >
                {t.modes[key]}
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
          <h2 className="gm-step-title">{t.goalTitle}</h2>
          <p className="gm-step-subtitle">{t.goalSubtitle}</p>

          <div className="gm-option-list">
            {(['rating', 'fun'] as GameGoalKey[]).map((key) => (
              <button
                key={key}
                type="button"
                className={
                  goal === key ? 'gm-option gm-option-active' : 'gm-option'
                }
                onClick={() => {
                  setGoal(key);
                  setStep(3);
                }}
              >
                {t.goals[key]}
              </button>
            ))}
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
          <h2 className="gm-step-title">
            {mode === 'mm' ? t.ratingTitleMm : t.ratingTitleFaceit}
          </h2>
          <p className="gm-step-subtitle">
            {mode === 'mm'
              ? ''
              : ''}
          </p>

          <input
            type="number"
            className="gm-input"
            value={ratingValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRatingValue(e.target.value)
            }
            placeholder={
              mode === 'mm'
                ? t.ratingPlaceholderMm
                : t.ratingPlaceholderFaceit
            }
          />

          <p className="gm-helper">{t.ratingHelper}</p>

          {ratingError && <p className="gm-error">{ratingError}</p>}

          <div className="gm-actions gm-step-actions">
            <button
              className="gm-button"
              type="button"
              onClick={() => {
                const trimmed = ratingValue.trim();
                if (!trimmed) {
                  setRatingError(
                    lang === 'ru'
                      ? mode === 'mm'
                        ? 'CS Rating обязателен'
                        : 'ELO обязателен'
                      : mode === 'mm'
                      ? 'CS Rating is required'
                      : 'ELO is required'
                  );
                  return;
                }
                if (Number.isNaN(Number(trimmed))) {
                  setRatingError(
                    lang === 'ru' ? 'Введите число' : 'Enter a number'
                  );
                  return;
                }
                setRatingError(null);
                setStep(4);
              }}
            >
              {lang === 'ru' ? 'Далее' : 'Next'}
            </button>
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
          <h2 className="gm-step-title">{t.languageTitle}</h2>
          <p className="gm-step-subtitle">{t.languageSubtitle}</p>

          <div className="gm-option-list">
            {(['ru', 'en', 'both'] as LanguagePref[]).map((key) => (
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
                  setStep(5);
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

  if (step === 5) {
    return (
      <div className="gm-screen gm-onboarding-screen">
        <div className="gm-header-row">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div className="gm-onboarding-step">
          <p className="gm-step-label">{stepLabel}</p>
          <h2 className="gm-step-title">{t.telegramTitle}</h2>
          <p className="gm-step-subtitle">{t.telegramSubtitle}</p>

          <input
            type="text"
            className="gm-input"
            value={telegram}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTelegram(e.target.value)
            }
            placeholder={t.telegramPlaceholder}
          />

          {telegramError && <p className="gm-error">{telegramError}</p>}

          <div className="gm-actions gm-step-actions">
            <button
              className="gm-button"
              type="button"
              onClick={() => {
                const value = telegram.trim();
                if (!value) {
                  setTelegramError(
                    lang === 'ru'
                      ? 'Укажите Telegram username'
                      : 'Enter your Telegram username'
                  );
                  return;
                }
                if (!value.startsWith('@')) {
                  setTelegramError(
                    lang === 'ru'
                      ? 'Username должен начинаться с @'
                      : 'Username must start with @'
                  );
                  return;
                }
                setTelegramError(null);
                setStep(6);
              }}
            >
              {lang === 'ru' ? 'Завершить' : 'Finish'}
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
          <button
            className="gm-button"
            type="button"
            onClick={() =>
              onComplete({
                mode: mode ?? 'faceit',
                goal: goal ?? undefined,
                ratingType:
                  mode === 'mm' ? 'cs' : mode === 'faceit' ? 'elo' : undefined,
                ratingValue: ratingValue || undefined,
                language: languagePref ?? 'ru',
                telegramUsername: telegram.trim().replace(/^@/, ''),
              })
            }
          >
            {t.finishCta}
          </button>
        </div>
      </div>
    </div>
  );
};
