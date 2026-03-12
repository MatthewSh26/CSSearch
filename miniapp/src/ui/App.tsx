import React, { useEffect, useState } from 'react';
import { initTelegramSdk } from '../telegram/initTelegramSdk';
import { OnboardingScreen } from './OnboardingScreen';
import { DiscoverScreen } from './DiscoverScreen';
import { MatchesScreen } from './MatchesScreen';
import { ProfileScreen } from './ProfileScreen';
import { LangToggle } from './LangToggle';
import { translations, type Lang } from './translations';
import type { UserProfile } from './profileTypes';

type Tab = 'discover' | 'matches' | 'profile';

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [tab, setTab] = useState<Tab>('discover');
  const [lang, setLang] = useState<Lang>('ru');
  const [profile, setProfile] = useState<UserProfile | null>(null);

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
    const t = translations[lang];
    return (
      <div className="gm-root">
        <div className="gm-center">{t.loading}</div>
      </div>
    );
  }

  if (isOnboarding) {
    return (
      <div className="gm-root">
        <div className="gm-content">
          <OnboardingScreen
            lang={lang}
            setLang={setLang}
            onComplete={(p) => {
              setProfile(p);
              setIsOnboarding(false);
            }}
          />
        </div>
      </div>
    );
  }

  const t = translations[lang];
  return (
    <div className="gm-root">
      <div className="gm-content">
        <div className="gm-header-row">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        {tab === 'discover' && <DiscoverScreen lang={lang} />}
        {tab === 'matches' && <MatchesScreen lang={lang} />}
        {tab === 'profile' && (
          <ProfileScreen
            lang={lang}
            profile={profile}
            onProfileChange={(patch) =>
              setProfile((prev) => (prev ? { ...prev, ...patch } : prev))
            }
          />
        )}
      </div>

      <nav className="gm-tabs">
        <button
          className={tab === 'discover' ? 'gm-tab gm-tab-active' : 'gm-tab'}
          onClick={() => setTab('discover')}
        >
          {t.tabs.discover}
        </button>
        <button
          className={tab === 'matches' ? 'gm-tab gm-tab-active' : 'gm-tab'}
          onClick={() => setTab('matches')}
        >
          {t.tabs.matches}
        </button>
        <button
          className={tab === 'profile' ? 'gm-tab gm-tab-active' : 'gm-tab'}
          onClick={() => setTab('profile')}
        >
          {t.tabs.profile}
        </button>
      </nav>
    </div>
  );
};
