import React from 'react';
import { translations, type Lang } from './translations';

type Match = {
  id: number;
  nickname: string;
  elo: number;
  language: string;
  note: string;
};

const MOCK_MATCHES: Match[] = [
  {
    id: 1,
    nickname: 'frost_',
    elo: 1842,
    language: 'EN / RU',
    note: 'IGL, evenings. Ready to queue.',
  },
  {
    id: 2,
    nickname: 'vex_',
    elo: 2156,
    language: 'RU',
    note: 'AWPer. Prefer late-night.',
  },
];

type Props = {
  lang: Lang;
};

export const MatchesScreen: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].matches;
  return (
    <div className="gm-screen">
      <h2 className="gm-title">{t.title}</h2>
      <p className="gm-subtitle">{t.subtitle}</p>

      {MOCK_MATCHES.map((match) => (
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

          <div className="gm-actions">
            <button type="button" className="gm-button">
              {t.openTelegram}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
