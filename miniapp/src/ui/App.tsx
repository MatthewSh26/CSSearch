import React, { useEffect, useState } from 'react';
import { initTelegramSdk } from '../telegram/initTelegramSdk';
import { OnboardingScreen } from './OnboardingScreen';
import { DiscoverScreen } from './DiscoverScreen';
import { MatchesScreen } from './MatchesScreen';
import { ProfileScreen } from './ProfileScreen';

type Tab = 'discover' | 'matches' | 'profile';

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [tab, setTab] = useState<Tab>('discover');

  useEffect(() => {
    initTelegramSdk()
      .catch((e) => {
        console.warn('initTelegramSdk error:', e);
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  if (!isReady) {
    return (
      <div className="gm-root">
        <div className="gm-center">Loading GGMatch...</div>
      </div>
    );
  }

  if (isOnboarding) {
    return (
      <div className="gm-root">
        <div className="gm-content">
          <OnboardingScreen
            onComplete={() => {
              setIsOnboarding(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="gm-root">
      <div className="gm-content">
        {tab === 'discover' && <DiscoverScreen />}
        {tab === 'matches' && <MatchesScreen />}
        {tab === 'profile' && <ProfileScreen />}
      </div>

      <nav className="gm-tabs">
        <button
          className={tab === 'discover' ? 'gm-tab gm-tab-active' : 'gm-tab'}
          onClick={() => setTab('discover')}
        >
          Discover
        </button>
        <button
          className={tab === 'matches' ? 'gm-tab gm-tab-active' : 'gm-tab'}
          onClick={() => setTab('matches')}
        >
          Matches
        </button>
        <button
          className={tab === 'profile' ? 'gm-tab gm-tab-active' : 'gm-tab'}
          onClick={() => setTab('profile')}
        >
          Profile
        </button>
      </nav>
    </div>
  );
};