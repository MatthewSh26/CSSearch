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
      <h2 className="gm-title">Your matches</h2>
      <p className="gm-subtitle">
        Players who liked you back will appear here.
      </p>

      {MOCK_MATCHES.map((match) => (
        <div key={match.id} className="gm-card">
          <div className="gm-card-row">
            <span className="gm-label">Name</span>
            <span className="gm-value">{match.name}</span>
          </div>
          <div className="gm-card-row">
            <span className="gm-label">Game</span>
            <span className="gm-value">{match.game}</span>
          </div>
          <div className="gm-card-row">
            <span className="gm-label">Role</span>
            <span className="gm-value">{match.role}</span>
          </div>
          <div className="gm-card-row">
            <span className="gm-label">Language</span>
            <span className="gm-value">{match.language}</span>
          </div>

          <div className="gm-actions">
            <button
              type="button"
              className="gm-button"
            >
              Open Telegram
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

