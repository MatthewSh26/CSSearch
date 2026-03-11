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
    bio: 'Агрессивный энтри, ищу слаженный состав на 5.',
  },
  {
    id: 2,
    name: 'Alex',
    age: 27,
    game: 'CS2',
    role: 'IGL',
    language: 'EN / RU',
    rank: 'Faceit 7',
    bio: 'Спокойный каллер, люблю структурированные дефолты и решения в середине раунда.',
  },
  {
    id: 3,
    name: 'Mia',
    age: 21,
    game: 'League of Legends',
    role: 'Support',
    language: 'EN',
    rank: 'Diamond 1',
    bio: 'Руминг саппорт, люблю контроль карты и проактивную игру.',
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
        <h2 className="gm-title">Игроки пока закончились</h2>
        <p className="gm-subtitle">
          Загляни позже — появятся новые тиммейты.
        </p>
      </div>
    );
  }

  return (
    <div className="gm-screen">
      <h2 className="gm-title">Найди тиммейтов</h2>
      <p className="gm-subtitle">
        Здесь будут появляться карточки игроков.
      </p>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">Имя</span>
          <span className="gm-value">
            {current.name}, {current.age}
          </span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Игра</span>
          <span className="gm-value">{current.game}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Роль</span>
          <span className="gm-value">{current.role}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Язык</span>
          <span className="gm-value">{current.language}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Ранг</span>
          <span className="gm-value">{current.rank}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">О себе</span>
          <span className="gm-value">{current.bio}</span>
        </div>
      </div>

      <div className="gm-actions">
        <button
          type="button"
          className="gm-button-secondary"
          onClick={goNext}
        >
          Пропустить
        </button>
        <button
          type="button"
          className="gm-button"
          onClick={goNext}
        >
          Лайк
        </button>
      </div>
    </div>
  );
};

