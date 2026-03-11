import { init } from '@tma.js/sdk';

export async function initTelegramSdk() {
  if (typeof window === 'undefined') {
    return;
  }

  const anyWindow = window as any;
  const hasTelegram =
    anyWindow.Telegram &&
    anyWindow.Telegram.WebApp;

  if (!hasTelegram) {
    return;
  }

  try {
    init();
    anyWindow.Telegram.WebApp.ready();
    anyWindow.Telegram.WebApp.expand();
  } catch (e) {
    console.warn('Telegram Mini App SDK init failed:', e);
  }
}