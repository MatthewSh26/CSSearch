import React from 'react';

type Props = {
  onComplete: () => void;
};

export const OnboardingScreen: React.FC<Props> = ({ onComplete }) => {
  return (
    <div className="gm-screen">
      <h1 className="gm-title">Добро пожаловать в GGMatch</h1>
      <p className="gm-subtitle">
        Находите тиммейтов для любимых игр прямо в Telegram.
      </p>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">Подбор по игре</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Фильтр по языку и роли</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Мгновенная связь в Telegram</span>
        </div>
      </div>

      <div className="gm-actions">
        <button className="gm-button" onClick={onComplete}>
          Начать
        </button>
      </div>
    </div>
  );
};

