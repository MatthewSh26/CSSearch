import React, { useState } from 'react';

type Player = {
  id: number;
  name: string;
  age: number;
  game: string;
  role: string;
  language: string;
  rank: string;
  bio: string;
};

const MOCK_PLAYERS: Player[] = [
  {
    id: 1,
    name: 'Lina',
    age: 23,
    game: 'Valorant',
    role: 'Duelist',
    language: 'EN',
    rank: 'Immortal 2',
    bio: 'Aggressive entry fragger looking for a coordinated 5-stack.',
  },
  {
    id: 2,
    name: 'Alex',
    age: 27,
    game: 'CS2',
    role: 'IGL',
    language: 'EN / RU',
    rank: 'Faceit 7',
    bio: 'Calm shotcaller, prefers structured defaults and mid-round calls.',
  },
  {
    id: 3,
    name: 'Mia',
    age: 21,
    game: 'League of Legends',
    role: 'Support',
    language: 'EN',
    rank: 'Diamond 1',
    bio: 'Roaming support, loves vision control and proactive plays.',
  },
];

export const DiscoverScreen: React.FC = () => {
  const [index, setIndex] = useState(0);

  const hasMore = index < MOCK_PLAYERS.length;
  const current = hasMore ? MOCK_PLAYERS[index] : null;

  const goNext = () => {
    setIndex((prev) => prev + 1);
  };

  if (!current) {
    return (
      <div className="gm-screen gm-empty">
        <h2 className="gm-title">No more players for now</h2>
        <p className="gm-subtitle">
          Check back later for more teammates.
        </p>
      </div>
    );
  }

  return (
    <div className="gm-screen">
      <h2 className="gm-title">Discover teammates</h2>
      <p className="gm-subtitle">
        Swipe through potential teammates and build your perfect squad.
      </p>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">Name</span>
          <span className="gm-value">
            {current.name}, {current.age}
          </span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Game</span>
          <span className="gm-value">{current.game}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Role</span>
          <span className="gm-value">{current.role}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Language</span>
          <span className="gm-value">{current.language}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Rank</span>
          <span className="gm-value">{current.rank}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Bio</span>
          <span className="gm-value">{current.bio}</span>
        </div>
      </div>

      <div className="gm-actions">
        <button
          type="button"
          className="gm-button-secondary"
          onClick={goNext}
        >
          Skip
        </button>
        <button
          type="button"
          className="gm-button"
          onClick={goNext}
        >
          Like
        </button>
      </div>
    </div>
  );
};

