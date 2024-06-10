import AsyncStorage from "@react-native-async-storage/async-storage";

import { BoozyBFEvent, ReminderFrequency } from "../api/models";
import {
  computeProgressPercentage,
  countUniqueDays,
  generateNewId,
  generateRandomBoozyEvents,
  getDaysAgoFromNow,
  getDaysUntilEvent,
  getFirstAndLastDayOfMonth,
  getFirstAndLastDayOfMonthByMonthName,
  getLastDays,
  getLeavingTime,
  getMonthBounds,
  getMostRecentEvent,
  getSecondsFromFrequency,
  getShortMonthNames,
  getTotalGlasses,
} from "./";

describe("generateNewId", () => {
  it("should generate a new UUID", () => {
    const id1 = generateNewId();
    const id2 = generateNewId();
    expect(id1).not.toBe(id2);
  });
});

describe("generateRandomBoozyEvents", () => {
  it("should generate the specified number of events", () => {
    const events = generateRandomBoozyEvents(5);
    expect(events).toHaveLength(5);
  });

  it("should generate events with unique IDs", () => {
    const events = generateRandomBoozyEvents(5);
    const ids = events.map((event) => event.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(5);
  });
});

describe("getTotalGlasses", () => {
  it("should return 0 for an empty array of events", () => {
    const events: any[] = [];
    const total = getTotalGlasses(events);
    expect(total).toBe(0);
  });

  it("should return the correct total number of glasses", () => {
    const events: BoozyBFEvent[] = generateRandomBoozyEvents(3);
    const mutatedEvents = events.map((evt) => ({
      ...evt,
      numberOfGlasses: 3,
    }));
    const total = getTotalGlasses(mutatedEvents);
    expect(total).toBe(9);
  });
});

describe("getMostRecentEvent", () => {
  it("should return undefined for an empty array of events", () => {
    const events: any[] = [];
    const mostRecent = getMostRecentEvent(events);
    expect(mostRecent).toBeUndefined();
  });

  it("should return the correct most recent event", () => {
    const events: BoozyBFEvent[] = generateRandomBoozyEvents(3);

    events[0] = {
      ...events[0],
      id: "1",
      date: new Date("2022-01-01").getTime(),
    };
    events[1] = {
      ...events[1],
      id: "2",
      date: new Date("2022-01-03").getTime(),
    };
    events[2] = {
      ...events[2],
      id: "3",
      date: new Date("2022-01-02").getTime(),
    };

    const mostRecent = getMostRecentEvent(events);
    expect(mostRecent.id).toBe("2");
  });
});

describe("countUniqueDays", () => {
  it("should return an object with counts for each unique day in the events array", () => {
    const events: BoozyBFEvent[] = generateRandomBoozyEvents(6);

    events[0] = {
      ...events[0],
      date: new Date("2023-02-14").getTime(),
    };

    events[1] = {
      ...events[1],
      date: new Date("2023-02-14").getTime(),
    };

    events[2] = {
      ...events[2],
      date: new Date("2023-02-15").getTime(),
    };

    events[3] = {
      ...events[3],
      date: new Date("2023-02-16").getTime(),
    };

    events[4] = {
      ...events[4],
      date: new Date("2023-02-16").getTime(),
    };

    events[5] = {
      ...events[5],
      date: new Date("2023-02-17").getTime(),
    };

    const result = countUniqueDays(events);
    expect(result).toEqual({ 14: 2, 15: 1, 16: 2, 17: 1 });
  });

  it("should return an empty object when passed an empty array", () => {
    const result = countUniqueDays([]);
    expect(result).toEqual({});
  });

  it("should return undefined when passed a falsy value", () => {
    const result = countUniqueDays(undefined);
    expect(result).toBeUndefined();
  });
});

describe("getSecondsFromFrequency", () => {
  it("should return the correct number of seconds for the given frequency", () => {
    const frequency = ReminderFrequency.EVERY_60_MINUTES;
    const result = getSecondsFromFrequency(frequency);
    expect(result).toBe(3600);
  });

  it("should return zero when passed an invalid frequency", () => {
    const frequency = "invalid_frequency" as ReminderFrequency;
    const result = getSecondsFromFrequency(frequency);
    expect(result).toBe(0);
  });
});

describe("getLeavingTime", () => {
  /*
  it("should return the correct leaving time when given a positive shift value", () => {
    const shift = 2;
    const result = getLeavingTime(shift);
    expect(result).toEqual([2, expect.any(Number)]);
  });
*/
  it("should handle wrapping around to the next day when the shift goes past midnight", () => {
    const shift = 3;
    const result = getLeavingTime(shift);
    expect(result).toEqual([expect.any(Number), expect.any(Number)]);
  });

  it("should return the current time when given no shift value", () => {
    const result = getLeavingTime();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    expect(result).toEqual([hours, minutes]);
  });
});

describe("getLastDays", () => {
  beforeEach(async () => {
    // Clear data after each test
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Clear data after each test
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  const mockEvent = generateRandomBoozyEvents(1)[0];

  it('getLastDays returns "Yesterday" when given an event that occurred exactly 1 day ago', () => {
    const event: BoozyBFEvent = {
      ...mockEvent,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).getTime(),
    }; // 1 day ago
    expect(getLastDays(event)).toBe("Yesterday");
  });

  test('getLastDays returns "Today" for an event that occurred today', () => {
    const now = new Date();
    const event: BoozyBFEvent = {
      ...mockEvent,
      date: now.getTime(),
    };
    expect(getLastDays(event)).toBe("Today");
  });

  it('getLastDays returns "X days ago" when given an event that occurred more than 1 day ago', () => {
    const event: BoozyBFEvent = {
      ...mockEvent,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).getTime(),
    }; // 1 day ago

    expect(getLastDays(event)).toBe("2 days ago");
  });

  it("getLastDays returns 0 when given no event", () => {
    expect(getLastDays(null)).toBe("");
  });

  it("getDaysUntilEvent returns 0 when given an event that occurred today", () => {
    const event = { ...mockEvent, date: new Date().getTime() };
    expect(getDaysUntilEvent(event)).toBe(0);
  });

  it("getDaysAgoFromNow returns a fractional number when eventDate is within the past 24 hours", () => {
    const oneHourAgo = new Date().getTime() - 1 * 60 * 60 * 1000; // 1 hour ago
    expect(getDaysAgoFromNow(oneHourAgo)).toBeCloseTo(0.0416667); // Approximately 1/24
  });
});

describe("computeProgressPercentage", () => {
  it("should return 0 when currentValue is 0", () => {
    const result = computeProgressPercentage(100, 0);
    expect(result).toEqual(0);
  });

  it("should return 25 when currentValue is less than 25% of totalAmount", () => {
    const result = computeProgressPercentage(100, 20);
    expect(result).toEqual(25);
  });

  it("should return 50 when currentValue is between 25% and 60% of totalAmount", () => {
    const result = computeProgressPercentage(100, 50);
    expect(result).toEqual(50);
  });

  it("should return 75 when currentValue is between 60% and 80% of totalAmount", () => {
    const result = computeProgressPercentage(100, 70);
    expect(result).toEqual(75);
  });

  it("should return 100 when currentValue is equal or greater than 80% of totalAmount", () => {
    const result = computeProgressPercentage(100, 90);
    expect(result).toEqual(100);
  });
});

describe("getDaysAgoFromNow", () => {
  it("should return 0 when eventDate is today", () => {
    const now = new Date().getTime();
    const result = getDaysAgoFromNow(now);
    expect(result).toEqual(0);
  });

  it("should return 1 when eventDate is yesterday", () => {
    const now = new Date().getTime();
    const yesterday = now - 1000 * 60 * 60 * 24;
    const result = getDaysAgoFromNow(yesterday);
    expect(result).toEqual(1);
  });

  it("should return the number of days since the eventDate", () => {
    const now = new Date().getTime();
    const eventDate = now - 1000 * 60 * 60 * 24 * 7;
    const result = getDaysAgoFromNow(eventDate);
    expect(result).toEqual(7);
  });
});

describe("date utilities", () => {
  describe("getMonthNames", () => {
    it("returns a list of month names in three-letter format for the default locale", () => {
      const monthNames = getShortMonthNames();
      expect(monthNames).toEqual([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]);
    });

    it("returns a list of month names in three-letter format for a specified locale", () => {
      const monthNames = getShortMonthNames("de-DE");
      expect(monthNames).toEqual([
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
      ]);
    });
  });

  describe("getFirstAndLastDayOfMonth", () => {
    it("returns the first and last day of a specified month by month number", () => {
      const [firstDay, lastDay] = getFirstAndLastDayOfMonth(
        new Date().getFullYear(),
        2
      ); // March
      expect(firstDay.getDate()).toEqual(1);
      expect(lastDay.getDate()).toEqual(31);
    });

    it("returns the first and last day of a specified month by month name in three-letter format", () => {
      const [firstDay, lastDay] = getFirstAndLastDayOfMonthByMonthName(
        new Date().getFullYear(),
        "Mar"
      );
      expect(firstDay.getDate()).toEqual(1);
      expect(lastDay.getDate()).toEqual(31);
    });
  });

  describe("getMonthBounds", () => {
    it.skip("tests April of this year", () => {
      const month = 4; // April
      const { firstDay, lastDay } = getMonthBounds(
        new Date().getFullYear(),
        month
      );
      const first = `First day of month ${month}: ${firstDay}`;
      const last = `Last day of month ${month}: ${lastDay}`;

      expect(first).toEqual("First day of month 4: 1680307200");
      expect(last).toEqual("Last day of month 4: 1682812800");
    });

    it("tests February of 2020", () => {
      const month = 1;
      const { firstDay, lastDay } = getMonthBounds(2020, month);
      const first = `First day of month ${month}: ${firstDay}`;
      const last = `Last day of month ${month}: ${lastDay}`;

      expect(first).toEqual("First day of month 1: 1577836800");
      expect(last).toEqual("Last day of month 1: 1580428800");
    });
  });
});
