import React, { useState } from 'react';
import { translations, type Lang } from './translations';

type Player = {
  id: number;
  nickname: string;
  elo: number;
  csHours: number;
  language: string;
  playStyle: string;
  bio: string;
  playTime: string;
};

const MOCK_PLAYERS: Player[] = [
  {
    id: 1,
    nickname: 'frost_',
    elo: 1842,
    csHours: 2100,
    language: 'EN / RU',
    playStyle: 'IGL, structured defaults',
    bio: 'Looking for a steady 5-stack for Faceit. Prefer mid-round calls and clear roles.',
    playTime: 'evenings',
  },
  {
    id: 2,
    nickname: 'vex_',
    elo: 2156,
    csHours: 3400,
    language: 'RU',
    playStyle: 'AWPer, aggressive',
    bio: 'AWP main. Want teammates who play for picks and don’t overrotate.',
    playTime: 'nights',
  },
  {
    id: 3,
    nickname: 'nova_cs',
    elo: 1650,
    csHours: 1200,
    language: 'EN',
    playStyle: 'Support, lurk',
    bio: 'Support player, good at trading and late-round. Learning IGL basics.',
    playTime: 'daytime',
  },
  {
    id: 4,
    nickname: 's1mple_fan_99',
    elo: 1990,
    csHours: 2800,
    language: 'EN / UA',
    playStyle: 'Entry, rifler',
    bio: 'Entry fragger. Need a team that commits to executes and doesn’t bait.',
    playTime: 'evenings',
  },
  {
    id: 5,
    nickname: 'cold_',
    elo: 1780,
    csHours: 1900,
    language: 'RU / EN',
    playStyle: 'Rifler, anchor',
    bio: 'Anchor on CT. Prefer disciplined holds and clean retakes.',
    playTime: 'nights',
  },
];

const PLAY_TIME_KEYS = {
  evenings: { ru: 'вечером', en: 'evenings' },
  nights: { ru: 'ночью', en: 'nights' },
  daytime: { ru: 'днём', en: 'daytime' },
} as const;

type Props = {
  lang: Lang;
};

export const DiscoverScreen: React.FC<Props> = ({ lang }) => {
  const [index, setIndex] = useState(0);
  const t = translations[lang];
  const d = t.discover;
  const e = t.discoverEmpty;

  const hasMore = index < MOCK_PLAYERS.length;
  const current = hasMore ? MOCK_PLAYERS[index] : null;

  const goNext = () => setIndex((prev) => prev + 1);
  const startOver = () => setIndex(0);

  const playTimeLabel =
    current &&
    PLAY_TIME_KEYS[current.playTime as keyof typeof PLAY_TIME_KEYS]
      ? PLAY_TIME_KEYS[current.playTime as keyof typeof PLAY_TIME_KEYS][lang]
      : current?.playTime;

  if (!current) {
    return (
      <div className="gm-screen gm-empty-state">
        <div className="gm-empty-visual" aria-hidden>
          <div className="gm-empty-circle gm-empty-circle-1" />
          <div className="gm-empty-circle gm-empty-circle-2" />
          <div className="gm-empty-circle gm-empty-circle-3" />
          <div className="gm-empty-line gm-empty-line-1" />
          <div className="gm-empty-line gm-empty-line-2" />
          <div className="gm-empty-line gm-empty-line-3" />
        </div>
        <h2 className="gm-title">{e.title}</h2>
        <p className="gm-subtitle">{e.subtitle}</p>
        <div className="gm-actions">
          <button type="button" className="gm-button" onClick={startOver}>
            {e.startOver}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gm-screen">
      <h2 className="gm-title">{d.title}</h2>
      <p className="gm-subtitle">{d.subtitle}</p>

      <div className="gm-card gm-discover-card">
        <div className="gm-card-row">
          <span className="gm-label">{d.nickname}</span>
          <span className="gm-value">{current.nickname}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{d.elo}</span>
          <span className="gm-value">{current.elo}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{d.csHours}</span>
          <span className="gm-value">{current.csHours}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{d.language}</span>
          <span className="gm-value">{current.language}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{d.playStyle}</span>
          <span className="gm-value">{current.playStyle}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{d.plays}</span>
          <span className="gm-value">{playTimeLabel}</span>
        </div>
        <div className="gm-card-row gm-card-row-bio">
          <span className="gm-label">{d.about}</span>
          <span className="gm-value">{current.bio}</span>
        </div>
      </div>

      <div className="gm-actions">
        <button
          type="button"
          className="gm-button-secondary"
          onClick={goNext}
        >
          {d.skip}
        </button>
        <button type="button" className="gm-button" onClick={goNext}>
          {d.like}
        </button>
      </div>
    </div>
  );
};
