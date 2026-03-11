import React from 'react';

export const ProfileScreen: React.FC = () => {
  return (
    <div className="gm-screen">
      <h2 className="gm-title">Твой профиль</h2>
      <p className="gm-subtitle">
        Здесь будет профиль и настройки.
      </p>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">Имя</span>
          <span className="gm-value">PlayerOne</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Основная игра</span>
          <span className="gm-value">CS2</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Роль</span>
          <span className="gm-value">Rifler / Entry</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Язык</span>
          <span className="gm-value">EN</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Ранг</span>
          <span className="gm-value">Faceit 8</span>
        </div>
      </div>

      <h3 className="gm-title" style={{ marginTop: 24 }}>
        Предпочтения
      </h3>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">Платформа</span>
          <span className="gm-value">PC</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Стиль игры</span>
          <span className="gm-value">Соревновательный</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Голосовой чат</span>
          <span className="gm-value">Включен</span>
        </div>
      </div>

      <div className="gm-actions">
        <button
          type="button"
          className="gm-button-secondary"
        >
          Редактировать профиль
        </button>
      </div>
    </div>
  );
};

