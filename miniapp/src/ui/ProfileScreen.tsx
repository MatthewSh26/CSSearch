import React, { useState, ChangeEvent } from 'react';
import { translations, type Lang } from './translations';
import type { UserProfile, Mode, GameGoalKey, LanguagePref } from './profileTypes';

type Props = {
  lang: Lang;
  profile: UserProfile | null;
  onProfileChange: (patch: Partial<UserProfile>) => void;
};

export const ProfileScreen: React.FC<Props> = ({
  lang,
  profile,
  onProfileChange,
}) => {
  const t = translations[lang].profile;
  const [isEditing, setIsEditing] = useState(false);
  const [hours, setHours] = useState(profile?.hoursInGame ?? '');
  const [about, setAbout] = useState(profile?.aboutMe ?? '');
  const [style, setStyle] = useState(profile?.playStyle ?? '');
  const [steam, setSteam] = useState(profile?.steamNick ?? '');
  const [editMode, setEditMode] = useState<Mode>(profile?.mode ?? 'faceit');
  const [editGoal, setEditGoal] = useState<GameGoalKey | null>(
    profile?.goal ?? null
  );
  const [editRating, setEditRating] = useState(profile?.ratingValue ?? '');
  const [editLanguage, setEditLanguage] = useState<LanguagePref>(
    profile?.language ?? 'ru'
  );
  const [editTelegram, setEditTelegram] = useState(
    profile?.telegramUsername ? `@${profile.telegramUsername}` : ''
  );

  const modeLabel =
    profile?.mode === 'mm'
      ? 'MM / Premier'
      : profile?.mode === 'fun'
      ? 'Fun maps'
      : 'Faceit';

  const ratingLabel =
    profile?.ratingType === 'cs'
      ? profile.ratingValue ?? '—'
      : profile?.ratingType === 'elo'
      ? profile.ratingValue ?? '—'
      : '—';

  const languageLabel =
    profile?.language === 'both'
      ? lang === 'ru'
        ? 'Русский / English'
        : 'Russian / English'
      : profile?.language === 'ru'
      ? 'Русский'
      : profile?.language === 'en'
      ? 'English'
      : '—';

  return (
    <div className="gm-screen">
      <h2 className="gm-title">{t.title}</h2>
      <p className="gm-subtitle">{t.subtitle}</p>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">{t.nickname}</span>
          <span className="gm-value">
            {profile?.telegramUsername
              ? `@${profile.telegramUsername}`
              : '—'}
          </span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{t.elo}</span>
          <span className="gm-value">{ratingLabel}</span>
        </div>
        {profile?.hoursInGame && (
          <div className="gm-card-row">
            <span className="gm-label">{t.hours}</span>
            <span className="gm-value">{profile.hoursInGame}</span>
          </div>
        )}
        <div className="gm-card-row">
          <span className="gm-label">{t.language}</span>
          <span className="gm-value">{languageLabel}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{t.playStyle}</span>
          <span className="gm-value">{modeLabel}</span>
        </div>
        {profile?.aboutMe && (
          <div className="gm-card-row gm-card-row-bio">
            <span className="gm-label">{t.about}</span>
            <span className="gm-value">{profile.aboutMe}</span>
          </div>
        )}
        {profile?.steamNick && (
          <div className="gm-card-row">
            <span className="gm-label">{t.steamNick}</span>
            <span className="gm-value">{profile.steamNick}</span>
          </div>
        )}
      </div>

      <div className="gm-actions">
        <button
          type="button"
          className="gm-button-secondary"
          onClick={() => {
            setEditMode(profile?.mode ?? 'faceit');
            setEditGoal(profile?.goal ?? null);
            setEditRating(profile?.ratingValue ?? '');
            setEditLanguage(profile?.language ?? 'ru');
            setEditTelegram(
              profile?.telegramUsername ? `@${profile.telegramUsername}` : ''
            );
            setHours(profile?.hoursInGame ?? '');
            setAbout(profile?.aboutMe ?? '');
            setStyle(profile?.playStyle ?? '');
            setSteam(profile?.steamNick ?? '');
            setIsEditing(true);
          }}
        >
          {t.edit}
        </button>
      </div>

      {isEditing && (
        <div className="gm-card" style={{ marginTop: 16 }}>
          <div className="gm-card-row">
            <span className="gm-label">{translations[lang].onboarding.modeTitle}</span>
            <div className="gm-option-list">
              {(['faceit', 'mm', 'fun'] as Mode[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={
                    editMode === key ? 'gm-option gm-option-active' : 'gm-option'
                  }
                  onClick={() => setEditMode(key)}
                >
                  {translations[lang].onboarding.modes[key]}
                </button>
              ))}
            </div>
          </div>
          {editMode !== 'fun' && (
            <div className="gm-card-row">
              <span className="gm-label">
                {translations[lang].onboarding.goalTitle}
              </span>
              <div className="gm-option-list">
                {(['rating', 'fun'] as GameGoalKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={
                      editGoal === key ? 'gm-option gm-option-active' : 'gm-option'
                    }
                    onClick={() => setEditGoal(key)}
                  >
                    {translations[lang].onboarding.goals[key]}
                  </button>
                ))}
              </div>
            </div>
          )}
          {editMode !== 'fun' && (
            <div className="gm-card-row">
              <span className="gm-label">{t.elo}</span>
              <input
                className="gm-input"
                value={editRating}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditRating(e.target.value)
                }
                placeholder={
                  editMode === 'mm'
                    ? translations[lang].onboarding.ratingPlaceholderMm
                    : translations[lang].onboarding.ratingPlaceholderFaceit
                }
              />
              <p className="gm-helper">
                {translations[lang].onboarding.ratingHelper}
              </p>
            </div>
          )}
          <div className="gm-card-row">
            <span className="gm-label">
              {translations[lang].onboarding.languageTitle}
            </span>
            <div className="gm-option-list">
              {(['ru', 'en', 'both'] as LanguagePref[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={
                    editLanguage === key
                      ? 'gm-option gm-option-active'
                      : 'gm-option'
                  }
                  onClick={() => setEditLanguage(key)}
                >
                  {translations[lang].onboarding.languages[key]}
                </button>
              ))}
            </div>
          </div>
          <div className="gm-card-row">
            <span className="gm-label">Telegram</span>
            <input
              className="gm-input"
              value={editTelegram}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditTelegram(e.target.value)
              }
              placeholder="@username"
            />
          </div>
          <div className="gm-card-row">
            <span className="gm-label">{t.hours}</span>
            <input
              className="gm-input"
              value={hours}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHours(e.target.value)
              }
              placeholder={lang === 'ru' ? 'Например, 2000' : 'e.g. 2000'}
            />
          </div>
          <div className="gm-card-row gm-card-row-bio">
            <span className="gm-label">{t.about}</span>
            <textarea
              className="gm-input gm-textarea"
              value={about}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setAbout(e.target.value)
              }
              placeholder={
                lang === 'ru'
                  ? 'Коротко опиши себя и как любишь играть'
                  : 'Short note about how you like to play'
              }
            />
          </div>
          <div className="gm-card-row">
            <span className="gm-label">{t.playStyle}</span>
            <input
              className="gm-input"
              value={style}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStyle(e.target.value)
              }
              placeholder={
                lang === 'ru' ? 'Например, агрессивный rifler' : 'e.g. aggressive rifler'
              }
            />
          </div>
          <div className="gm-card-row">
            <span className="gm-label">{t.steamNick}</span>
            <input
              className="gm-input"
              value={steam}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSteam(e.target.value)
              }
              placeholder={
                lang === 'ru' ? 'Ник в Steam' : 'Steam nickname'
              }
            />
          </div>

          <div className="gm-actions gm-step-actions">
            <button
              type="button"
              className="gm-button-secondary"
              onClick={() => setIsEditing(false)}
            >
              {lang === 'ru' ? 'Отмена' : 'Cancel'}
            </button>
            <button
              type="button"
              className="gm-button"
              onClick={() => {
                onProfileChange({
                  mode: editMode,
                  goal: editMode === 'fun' ? undefined : editGoal ?? undefined,
                  ratingType:
                    editMode === 'mm'
                      ? 'cs'
                      : editMode === 'faceit'
                      ? 'elo'
                      : undefined,
                  ratingValue: editRating.trim() || undefined,
                  language: editLanguage,
                  telegramUsername: editTelegram
                    .trim()
                    .replace(/^@/, ''),
                  hoursInGame: hours || undefined,
                  aboutMe: about || undefined,
                  playStyle: style || undefined,
                  steamNick: steam || undefined,
                });
                setIsEditing(false);
              }}
            >
              {lang === 'ru' ? 'Сохранить' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
