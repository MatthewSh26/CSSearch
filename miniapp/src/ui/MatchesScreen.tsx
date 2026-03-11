import React from 'react';

type Match = {
  id: number;
  name: string;
  game: string;
  role: string;
  language: string;
};

const MOCK_MATCHES: Match[] = [
  {
    id: 1,
    name: 'Nova',
    game: 'Valorant',
    role: 'Controller',
    language: 'EN',
  },
  {
    id: 2,
    name: 'Rex',
    game: 'CS2',
    role: 'AWPer',
    language: 'EN / DE',
  },
];

export const MatchesScreen: React.FC = () => {
  return (
    <div className="gm-screen">
      <h2 className="gm-title">Твои матчи</h2>
      <p className="gm-subtitle">
        Здесь будут появляться совпадения и переходы в Telegram.
      </p>

      {MOCK_MATCHES.map((match) => (
        <div key={match.id} className="gm-card">
          <div className="gm-card-row">
            <span className="gm-label">Имя</span>
            <span className="gm-value">{match.name}</span>
          </div>
          <div className="gm-card-row">
            <span className="gm-label">Игра</span>
            <span className="gm-value">{match.game}</span>
          </div>
          <div className="gm-card-row">
            <span className="gm-label">Роль</span>
            <span className="gm-value">{match.role}</span>
          </div>
          <div className="gm-card-row">
            <span className="gm-label">Язык</span>
            <span className="gm-value">{match.language}</span>
          </div>

          <div className="gm-actions">
            <button
              type="button"
              className="gm-button"
            >
              Открыть Telegram
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

