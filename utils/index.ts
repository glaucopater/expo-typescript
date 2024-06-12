import "react-native-get-random-values";

import {
  BoozyBFEvent,
  Drink,
  DrinkType,
  HangoverFeedback,
  MoodFeedback,
  ReminderFrequency,
} from "../api/models";
import {
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  DEFAULT_TIME_SHIFT,
} from "../config";
import { BarDataType, barData } from "../components/Chart/CustomBarChart";

export function uuid(): string {
  return `${Date.now().toString(16)}-${Math.floor(
    Math.random() * 0x10000
  ).toString(16)}`;
}

export const sortArrayByDate = (arr: BoozyBFEvent[]) => {
  return [...arr].sort((a, b) => b.date - a.date);
};

export const generateNewId = () => uuid();
export const getRandonName = () => Math.random().toString(36).substring(2, 15);
export const moodsValues: MoodFeedback[] = Object.values(MoodFeedback);
export const drinkTypes: DrinkType[] = Object.values(DrinkType);
export const hangoversValues: HangoverFeedback[] =
  Object.values(HangoverFeedback);

export const generateRandomBoozyEvents = (times: number): BoozyBFEvent[] => {
  return Array.from(Array(times).keys()).map(() => ({
    id: uuid(),
    name: getRandonName(),
    date: new Date().getTime(),
    numberOfGlasses: Math.floor(Math.random() * 10) + 1,
    moodStatus: moodsValues[Math.floor(Math.random() * moodsValues.length)],
    hangoverFeedback:
      hangoversValues[Math.floor(Math.random() * hangoversValues.length)],
    amount: Math.random() * 100,
    currency: DEFAULT_CURRENCY,
    notes: Math.random().toString(36).substring(2, 15),
    lastUpdate: new Date().getTime(),
  }));
};

export const getTotalGlasses = (events: BoozyBFEvent[]) => {
  return (
    events &&
    events.reduce(
      (accumulator, currentValue) => accumulator + currentValue.numberOfGlasses,
      0
    )
  );
};

export const getTotalAmount = (events: BoozyBFEvent[]) => {
  return (
    events &&
    events.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    )
  );
};

export const getLastDrinkDay = (events: BoozyBFEvent[]) => {
  return (
    events &&
    events.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    )
  );
};

export const getMostRecentEvent = (events: BoozyBFEvent[]) => {
  return (
    events &&
    events.reduce((mostRecentEvent, event) => {
      const eventDate = new Date(event.date);
      const mostRecentDate = new Date(mostRecentEvent.date);
      return eventDate > mostRecentDate ? event : mostRecentEvent;
    }, events[0])
  );
};

export const getLastDays0 = (moreRecentEvent: BoozyBFEvent) => {
  if (!moreRecentEvent) return "";
  const lastDays = getDaysUntilEvent(moreRecentEvent);
  if (isNaN(lastDays)) return "";
  if (lastDays < 1) return "Today";
  return lastDays == 1 ? "Yesterday" : `${lastDays} days ago`;
};

export const getDaysUntilEvent0 = (event: BoozyBFEvent) => {
  const today = new Date();
  const eventDate = new Date(event.date);
  const timeDiff = Math.abs(eventDate.getTime() - today.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
};

export const getLastDays = (moreRecentEvent: BoozyBFEvent) => {
  if (!moreRecentEvent) return "";
  const lastDays = getDaysUntilEvent(moreRecentEvent);
  if (!moreRecentEvent || isNaN(lastDays)) return "";
  if (lastDays === 0) return "Today";
  if (lastDays === 1) return "Yesterday";
  return `${lastDays} day${lastDays > 1 ? "s" : ""} ago`;
};

export const getDaysUntilEvent = (event: BoozyBFEvent) => {
  const today = new Date();
  today.setSeconds(0, 0);
  const eventDate = new Date(event.date);
  eventDate.setSeconds(0, 0);
  const timeDiff = Math.abs(eventDate.getTime() - today.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
};

export const countUniqueDays = (events: BoozyBFEvent[]) => {
  return events?.reduce((counts, event) => {
    const eventDate = new Date(event.date);
    const eventDay = eventDate.getDate();
    counts[eventDay] = (counts[eventDay] || 0) + 1;
    return counts;
  }, {});
};

export const getSecondsFromFrequency = (frequency: ReminderFrequency) => {
  const selectedKey =
    Object.keys(ReminderFrequency)[
      Object.values(ReminderFrequency).indexOf(frequency)
    ];
  return selectedKey ? Number(selectedKey.split("_")[1]) * 60 : 0;
};

// return DEFAULT_TIME_SHIFT hours in the future from now
export const getLeavingTime = (shift: number = DEFAULT_TIME_SHIFT) => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const newHours =
    hours + shift > DEFAULT_TIME_SHIFT
      ? (hours + shift) % shift
      : hours + shift;

  return [newHours, minutes];
};

export const computeProgressPercentage = (
  totalAmount: number,
  currentValue: number
) => {
  //totalAmount : 100 = currentValue : x
  const x = (currentValue * 100) / totalAmount;
  if (currentValue === 0) return 0;
  if (x < 25) return 25;
  if (x > 25 && x < 60) return 50;
  if (x > 60 && x < 80) return 75;
  if (x >= 80) return 100;
};

export const getDaysAgoFromNow = (eventDate: number) => {
  const now = new Date().getTime();
  return (now - eventDate) / 1000 / 60 / 60 / 24;
};

export const calculateMinutesRemaining = (targetTime: Date) => {
  const now = new Date();
  const diffMilliseconds = targetTime.getTime() - now.getTime();
  const diffMinutes = Math.ceil(diffMilliseconds / (1000 * 60));
  return diffMinutes;
};

export const generateRandomDrinks = (times: number): Drink[] => {
  return Array.from(Array(times).keys()).map(() => ({
    id: uuid(),
    name: getRandonName(),
    type: drinkTypes[Math.floor(Math.random() * drinkTypes.length)],
    alcoholPercentage: 0.07,
    quantity: 100,
    unitOfMeasurement: "ml",
  }));
};

export const getShortMonthNames = (
  locale: string = DEFAULT_LOCALE
): string[] => {
  const date = new Date();
  return Array.from({ length: 12 }, (_, index) => {
    date.setMonth(index);
    return date.toLocaleString(locale, { month: "short" });
  });
};

export const getFirstAndLastDayOfMonth = (
  year: number,
  month: number
): Date[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month, daysInMonth);
  return [firstDay, lastDay];
};

export const getFirstAndLastDayOfMonthByMonthName = (
  year: number,
  month: string
): Date[] => {
  const monthIndex = new Date(Date.parse(`${month} 1, ${year}`)).getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex, daysInMonth);
  return [firstDay, lastDay];
};

export const getMonthBounds_ = (
  month: number
): { firstDay: number; lastDay: number } => {
  const date = new Date();
  date.setUTCMonth(month - 1);
  date.setUTCDate(1);
  const firstDay = Math.floor(date.getTime() / 1000);
  date.setUTCMonth(month);
  date.setUTCDate(0);
  const lastDay = Math.floor(date.getTime() / 1000);
  return { firstDay, lastDay };
};

export function getMonthBounds(
  year: number,
  month: number
): { firstDay: number; lastDay: number } {
  const date = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
  const firstDay = Math.floor(date.getTime() / 1000);
  date.setUTCMonth(date.getUTCMonth() + 1);
  date.setUTCDate(0);
  const lastDay = Math.floor(date.getTime() / 1000);
  return { firstDay, lastDay };
}

export const adjustTimeDisplay = (
  value: number | string,
  isMinuteFormat,
  isHourFormat
) => {
  const numericValue = Number(value);
  let adjustedValue = value;
  if (numericValue < 10) adjustedValue = "0" + value;
  if (isMinuteFormat && numericValue > 59) adjustedValue = 59;
  if (isHourFormat && numericValue > 23) adjustedValue = 23;
  return String(adjustedValue);
};

export const adjustTimeDisplayFull = (
  eventTime: BoozyBFEvent["reminderLeavingTime"]
) => {
  const [hours, minutes] = eventTime;

  return (
    adjustTimeDisplay(hours, true, false) +
    ":" +
    adjustTimeDisplay(minutes, false, true)
  );
};

export const getChartData = (events: BoozyBFEvent[]): BarDataType => {
  const eventsData: {
    [key: string]: {
      date: string;
      numberOfGlasses: number;
    };
  } = getEventsByNumberOfGlassesDescending(events);

  const data = Object.values(eventsData).map((event) => event.numberOfGlasses);

  const chartData: typeof barData = {
    labels: [],
    datasets: [
      {
        data,
      },
    ],
  };

  return chartData;
};

export const getSortedEvents = (events: BoozyBFEvent[]) => {
  return sortArrayByDate(events);
};

interface Event {
  date: string;
  numberOfGlasses: number;
  // other properties...
}

export const getEventsByNumberOfGlassesDescending = (
  events: BoozyBFEvent[]
) => {
  const groupedEvents = events.reduce((result, event: BoozyBFEvent) => {
    const date = event.date;

    if (!result[date]) {
      result[date] = {
        date: event.date,
        numberOfGlasses: 0,
      };
    }
    result[date].numberOfGlasses += event.numberOfGlasses;
    return result;
  }, {});

  return groupedEvents;
};
