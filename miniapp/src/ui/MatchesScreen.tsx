import React from 'react';
import { translations, type Lang } from './translations';

type Match = {
  id: number;
  nickname: string;
  elo: number;
  language: string;
  note: string;
  telegramUsername?: string;
};

const MOCK_MATCHES: Match[] = [];

type Props = {
  lang: Lang;
};

export const MatchesScreen: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].matches;
  return (
    <div className="gm-screen">
      <h2 className="gm-title">{t.title}</h2>
      <p className="gm-subtitle">{t.subtitle}</p>

      {!MOCK_MATCHES.length && (
        <div className="gm-card">
          <div className="gm-card-row gm-card-row-bio">
            <span className="gm-label">
              {lang === 'ru' ? 'Пока нет совпадений' : 'No matches yet'}
            </span>
            <span className="gm-value">
              {lang === 'ru'
                ? 'Совпадения появятся после взаимного лайка'
                : 'Matches appear after mutual likes'}
            </span>
          </div>
        </div>
      )}

      {MOCK_MATCHES.map((match) => {
        const username =
          match.telegramUsername?.replace(/^@/, '') || undefined;
        const usernameLabel = username ? `@${username}` : '—';
        const href = username ? `https://t.me/${username}` : undefined;

        return (
          <div key={match.id} className="gm-card">
            <div className="gm-card-row">
              <span className="gm-label">{t.nickname}</span>
              <span className="gm-value">{match.nickname}</span>
            </div>
            <div className="gm-card-row">
              <span className="gm-label">{t.elo}</span>
              <span className="gm-value">{match.elo}</span>
            </div>
            <div className="gm-card-row">
              <span className="gm-label">{t.language}</span>
              <span className="gm-value">{match.language}</span>
            </div>
            <div className="gm-card-row">
              <span className="gm-label">{t.note}</span>
              <span className="gm-value">{match.note}</span>
            </div>
            <div className="gm-card-row">
              <span className="gm-label">{t.telegram}</span>
              <span className="gm-value">{usernameLabel}</span>
            </div>

            <div className="gm-actions">
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gm-button gm-link-button"
                >
                  {t.openTelegram}
                </a>
              ) : (
                <button type="button" className="gm-button" disabled>
                  {t.openTelegram}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
