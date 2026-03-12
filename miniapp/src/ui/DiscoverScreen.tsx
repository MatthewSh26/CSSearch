import React, { useState, useRef, useCallback } from 'react';
import { translations, type Lang } from './translations';
import type {
  Mode,
  GameGoalKey,
  LanguagePref,
  RatingType,
} from './profileTypes';

type Player = {
  id: number;
  telegramUsername: string;
  mode: Mode;
  goal?: GameGoalKey;
  ratingType?: RatingType;
  ratingValue?: string;
  language: LanguagePref;
  hoursInGame?: string;
  aboutMe?: string;
  playStyle?: string;
  steamNick?: string;
};

const MOCK_PLAYERS: Player[] = [
  {
    id: 1,
    telegramUsername: 'frost_',
    mode: 'faceit',
    goal: 'rating',
    ratingType: 'elo',
    ratingValue: '1842',
    language: 'both',
    hoursInGame: '2100',
    playStyle: 'IGL, structured defaults',
    aboutMe:
      'Looking for a steady 5-stack for Faceit. Prefer mid-round calls and clear roles.',
    steamNick: 'frost_gg',
  },
  {
    id: 2,
    telegramUsername: 'vex_',
    mode: 'faceit',
    goal: 'fun',
    ratingType: 'elo',
    ratingValue: '2156',
    language: 'ru',
    hoursInGame: '3400',
    playStyle: 'AWPer, aggressive',
    aboutMe: 'AWP main. Want teammates who play for picks and don’t overrotate.',
  },
  {
    id: 3,
    telegramUsername: 'nova_cs',
    mode: 'mm',
    goal: 'fun',
    ratingType: 'cs',
    ratingValue: '12000',
    language: 'en',
    playStyle: 'Support, lurk',
    aboutMe:
      'Support player, good at trading and late-round. Learning IGL basics.',
  },
  {
    id: 4,
    telegramUsername: 's1mple_fan_99',
    mode: 'faceit',
    goal: 'rating',
    ratingType: 'elo',
    ratingValue: '1990',
    language: 'both',
    playStyle: 'Entry, rifler',
    aboutMe:
      'Entry fragger. Need a team that commits to executes and doesn’t bait.',
  },
  {
    id: 5,
    telegramUsername: 'cold_',
    mode: 'fun',
    language: 'ru',
    hoursInGame: '1900',
    playStyle: 'Rifler, anchor',
    aboutMe: 'Anchor on CT. Prefer disciplined holds and clean retakes.',
  },
];

type Props = {
  lang: Lang;
};

export const DiscoverScreen: React.FC<Props> = ({ lang }) => {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<-1 | 0 | 1>(0);
  const startXRef = useRef<number | null>(null);
  const t = translations[lang];
  const d = t.discover;
  const e = t.discoverEmpty;

  const hasMore = index < MOCK_PLAYERS.length;
  const current = hasMore ? MOCK_PLAYERS[index] : null;

  const goNext = useCallback(() => {
    setIndex((prev) => prev + 1);
    setDragX(0);
    setSwipeDirection(0);
  }, []);

  const startOver = () => {
    setIndex(0);
    setDragX(0);
    setSwipeDirection(0);
  };

  const triggerSwipe = (direction: -1 | 1) => {
    if (!current) return;
    setSwipeDirection(direction);
    setTimeout(goNext, 200);
  };

  const handleStart = (clientX: number) => {
    startXRef.current = clientX;
    setSwipeDirection(0);
  };

  const handleMove = (clientX: number) => {
    if (startXRef.current == null || swipeDirection !== 0) return;
    const delta = clientX - startXRef.current;
    setDragX(delta);
  };

  const handleEnd = () => {
    if (startXRef.current == null) return;
    const threshold = 80;
    if (dragX > threshold) {
      triggerSwipe(1);
    } else if (dragX < -threshold) {
      triggerSwipe(-1);
    } else {
      setDragX(0);
    }
    startXRef.current = null;
  };

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
            <span className="gm-refresh-icon" aria-hidden="true">
              ↻
            </span>
            {e.startOver}
          </button>
        </div>
      </div>
    );
  }

  const translateX =
    swipeDirection === 0 ? dragX : swipeDirection * 400;
  const rotate = translateX / 40;
  const opacity =
    swipeDirection === 0 ? 1 : 0;

  return (
    <div className="gm-screen">
      <h2 className="gm-title">{d.title}</h2>
      <p className="gm-subtitle">{d.subtitle}</p>

      <div
        className="gm-card gm-discover-card gm-discover-swipe"
        style={{
          transform: `translateX(${translateX}px) rotate(${rotate}deg)`,
          opacity,
        }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => {
          if (e.buttons === 1) {
            handleMove(e.clientX);
          }
        }}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <div className="gm-card-row">
          <span className="gm-label">{d.nickname}</span>
          <span className="gm-value">@{current.telegramUsername}</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{d.elo}</span>
          <span className="gm-value">
            {current.ratingValue ?? '—'}
          </span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{d.mode}</span>
          <span className="gm-value">
            {current.mode === 'mm'
              ? 'MM / Premier'
              : current.mode === 'fun'
              ? 'Fun maps'
              : 'Faceit'}
          </span>
        </div>
        {current.goal && (
          <div className="gm-card-row">
            <span className="gm-label">{d.goal}</span>
            <span className="gm-value">
              {t.onboarding.goals[current.goal]}
            </span>
          </div>
        )}
        <div className="gm-card-row">
          <span className="gm-label">{d.language}</span>
          <span className="gm-value">
            {current.language === 'both'
              ? lang === 'ru'
                ? 'Русский / English'
                : 'Russian / English'
              : current.language === 'ru'
              ? lang === 'ru'
                ? 'Русский'
                : 'Russian'
              : 'English'}
          </span>
        </div>
        {current.hoursInGame && (
          <div className="gm-card-row">
            <span className="gm-label">{d.hours}</span>
            <span className="gm-value">{current.hoursInGame}</span>
          </div>
        )}
        {current.playStyle && (
          <div className="gm-card-row">
            <span className="gm-label">{d.playStyle}</span>
            <span className="gm-value">{current.playStyle}</span>
          </div>
        )}
        {current.aboutMe && (
          <div className="gm-card-row gm-card-row-bio">
            <span className="gm-label">{d.about}</span>
            <span className="gm-value">{current.aboutMe}</span>
          </div>
        )}
        {current.steamNick && (
          <div className="gm-card-row">
            <span className="gm-label">{d.steamNick}</span>
            <span className="gm-value">{current.steamNick}</span>
          </div>
        )}
      </div>

      <div className="gm-actions">
        <button
          type="button"
          className="gm-button-secondary"
          onClick={() => triggerSwipe(-1)}
        >
          {d.skip}
        </button>
        <button
          type="button"
          className="gm-button"
          onClick={() => triggerSwipe(1)}
        >
          {d.like}
        </button>
      </div>
    </div>
  );
};
