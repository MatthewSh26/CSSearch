import React from 'react';

type Props = {
  onComplete: () => void;
};

export const OnboardingScreen: React.FC<Props> = ({ onComplete }) => {
  return (
    <div className="gm-screen">
      <h1 className="gm-title">Welcome to GGMatch</h1>
      <p className="gm-subtitle">
        Find teammates for your favorite games right inside Telegram.
      </p>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">Match by game</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Filter by language and role</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Connect instantly in Telegram</span>
        </div>
      </div>

      <div className="gm-actions">
        <button className="gm-button" onClick={onComplete}>
          Start
        </button>
      </div>
    </div>
  );
};

