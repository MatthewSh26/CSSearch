export type Mode = 'faceit' | 'mm' | 'fun';

export type GameGoalKey = 'rating' | 'fun';

export type LanguagePref = 'ru' | 'en' | 'both';

export type RatingType = 'elo' | 'cs';

export type UserProfile = {
  mode: Mode;
  goal?: GameGoalKey;
  ratingType?: RatingType;
  ratingValue?: string;
  language: LanguagePref;
  telegramUsername: string;
  hoursInGame?: string;
  aboutMe?: string;
  playStyle?: string;
  steamNick?: string;
};


