import React from 'react';

export const ProfileScreen: React.FC = () => {
  return (
    <div className="gm-screen">
      <h2 className="gm-title">Your profile</h2>
      <p className="gm-subtitle">
        This is how other players will see you in GGMatch.
      </p>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">Name</span>
          <span className="gm-value">PlayerOne</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Main game</span>
          <span className="gm-value">CS2</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Role</span>
          <span className="gm-value">Rifler / Entry</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Language</span>
          <span className="gm-value">EN</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Rank</span>
          <span className="gm-value">Faceit 8</span>
        </div>
      </div>

      <h3 className="gm-title" style={{ marginTop: 24 }}>
        Preferences
      </h3>

      <div className="gm-card">
        <div className="gm-card-row">
          <span className="gm-label">Platform</span>
          <span className="gm-value">PC</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Play style</span>
          <span className="gm-value">Competitive</span>
        </div>
        <div className="gm-card-row">
          <span className="gm-label">Voice chat</span>
          <span className="gm-value">Enabled</span>
        </div>
      </div>

      <div className="gm-actions">
        <button
          type="button"
          className="gm-button-secondary"
        >
          Edit profile
        </button>
      </div>
    </div>
  );
};

