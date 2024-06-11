export enum MoodFeedback {
  HAPPY = "Happy",
  NATURAL = "Natural",
  TERRIBLE = "Terrible",
  SAD = "Sad",
  AGGRESSIVE = "Aggressive",
  CONFIDENT = "Confident",
  NERVOUS = "Nervous",
  TIRED = "Tired",
}

export enum HangoverFeedback {
  FRESH = "I'm fresh",
  MILD = "Tired",
  BAD = "Hangover",
}

export enum EventCompanion {
  FRIENDS = "Friends",
  COLLEAGUES = "Colleagues",
  BFF = "BFF",
  PARTNER = "Partner",
  FAMILIY = "Family",
  DATE = "Date",
  BUSINESS = "Business",
  STRANGERS = "Strangers",
}

export enum EventPurpose {
  RELAX = "Relax",
  GETWASTED = "Get Wasted",
  CONNECT = "Connect",
}

export enum BoozyBFEventStatus {
  RUNNING = "RUNNING",
  PLANNED = "PLANNED",
  COMPLETED = "COMPLETED",
  ALMOST_COMPLETED = "ALMOST_COMPLETED",
}

export enum EventComfortableLevel {
  TERRIBLE = "Terrible",
  SAD = "Sad",
  NATURAL = "Natural",
  HAPPY = "Happy",
}

export type RunningBoozyBFEvent = Pick<
  BoozyBFEvent,
  | "id"
  | "name"
  | "date"
  | "lastUpdate"
  | "status"
  | "purpose"
  | "companion"
  | "comfortableLevel"
  | "reminderFrequency"
  | "reminderLeavingTime"
  | "startReminderTime"
  | "numberOfGlasses"
  | "estimatedLeavingTime"
>;

export type BoozyBFEvent = {
  id: string;
  name: string;
  date: number;
  numberOfGlasses: number;
  moodStatus: MoodFeedback;
  hangoverFeedback: HangoverFeedback;
  amount: number;
  currency: string;
  notes?: string;
  lastUpdate: number;
  version?: number;
  status?: BoozyBFEventStatus;
  purpose?: EventPurpose;
  companion?: EventCompanion[];
  comfortableLevel?: EventComfortableLevel;
  reminderLeavingTime?: number[];
  startReminderTime?: number[];
  reminderFrequency?: ReminderFrequency;
  estimatedLeavingTime?: number;
  drinks?: Drink[];
};

export enum ReminderFrequency {
  EVERY_30_MINUTES = "Every 30 Minutes",
  EVERY_60_MINUTES = "Every Hour",
  EVERY_120_MINUTES = "Every 2 Hours",
}

export enum Tags {
  GOOD = "Good",
  MEDIUM = "Medium",
  BAD = "Bad",
  GREY = "Grey",
}

export enum NavigationMenuItemType {
  TIMER = "TIMER",
  GLASS = "GLASS",
}

export enum UserGoals {
  DRINK_LESS = "Drink Less",
  GO_ALCOHOL_FREE = "Go Alcohol Free",
  BUILD_BETTER_HABIT = "Build Better Drinking Habit",
  JUST_TRACK = "Just To Track My Drinking Habit",
}

export type UserDetails = {
  decimalSeparator: string;
  languageTag: string;
  regionCode: string;
};

export type AppDetails = {
  name: string;
  version: string;
  lastUpdate: number;
  lastMigration?: string;
};

export enum DrinkType {
  WINE = "Wine",
  BEER = "Beer",
  BOTTLE = "Bottle",
  COCKTAIL = "Cocktail",
  CAN = "Can",
  SHORT_DRINK = "Short Drink",
  LONG_DRINK = "Long Drink",
  SHOT = "Shot",
}

export type Drink = {
  id: string;
  name: string;
  type: DrinkType;
  quantity: number;
  unitOfMeasurement: string;
  alcoholPercentage: number;
  preference?: boolean;
  numberOfGlasses?: number;
};
