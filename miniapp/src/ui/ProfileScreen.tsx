import React from 'react';
import { translations, type Lang } from './translations';

type Props = {
  lang: Lang;
};

export const ProfileScreen: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].profile;
  return (
    <div className="gm-screen">
      <h2 className="gm-title">{t.title}</h2>
      <p className="gm-subtitle">{t.subtitle}</p>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">{t.nickname}</span>
          <span className="gm-value">PlayerOne</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{t.elo}</span>
          <span className="gm-value">1920</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{t.csHours}</span>
          <span className="gm-value">2400</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{t.language}</span>
          <span className="gm-value">EN / RU</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{t.playStyle}</span>
          <span className="gm-value">Rifler, entry</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">{t.playTime}</span>
          <span className="gm-value">Evenings</span>
        </div>
      </div>

      <div className="gm-actions">
        <button type="button" className="gm-button-secondary">
          {t.edit}
        </button>
      </div>
    </div>
  );
};
