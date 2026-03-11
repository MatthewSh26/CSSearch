import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEBAPP_URL; // URL of deployed Mini App (or local tunnel)

if (!token) {
  throw new Error('BOT_TOKEN is not set in environment variables.');
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start(?:\s+(.*))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const payload = match && match[1] ? match[1] : undefined;

  const keyboard: TelegramBot.ReplyKeyboardMarkup = {
    keyboard: [
      [
        {
          text: 'Open GGMatch',
          web_app: webAppUrl ? { url: webAppUrl } : undefined,
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };

  await bot.sendMessage(
    chatId,
    payload
      ? `Welcome to GGMatch! You were invited with code: ${payload}`
      : 'Welcome to GGMatch! Tap the button below to open the Mini App.',
    { reply_markup: keyboard }
  );
});

// Helper to notify user about a new match (to be used from backend via HTTP or queue)
export async function notifyNewMatch(params: {
  chatId: number;
  teammateName: string;
}) {
  const { chatId, teammateName } = params;
  await bot.sendMessage(
    chatId,
    `You have a new teammate match: ${teammateName}. Open GGMatch to see more.`
  );
}

