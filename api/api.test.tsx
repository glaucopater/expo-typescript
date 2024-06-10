import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getMaxPerMonthGlasses,
  getPreviousEvents,
  getSortedPreviousEvents,
  removeEvent,
  saveMaxPerMonthGlasses,
  saveSingleEvent,
  storeData,
  updateEvent,
} from '.';
import { generateRandomBoozyEvents, sortArrayByDate } from '../utils';
import * as api from './';
import {
  BoozyBFEvent,
  BoozyBFEventStatus,
  EventComfortableLevel,
  EventCompanion,
  EventPurpose,
  HangoverFeedback,
  MoodFeedback,
  ReminderFrequency,
  RunningBoozyBFEvent,
} from './models';

const testEvent: BoozyBFEvent = {
  id: '1',
  name: 'Friday Night Party',
  date: Date.now(),
  numberOfGlasses: 5,
  moodStatus: MoodFeedback.HAPPY,
  hangoverFeedback: HangoverFeedback.BAD,
  amount: 20.5,
  currency: 'EUR',
  notes: 'Had a great time with friends',
  lastUpdate: Date.now(),
  version: 1,
  status: BoozyBFEventStatus.RUNNING,
  purpose: EventPurpose.GETWASTED,
  companion: [EventCompanion.FRIENDS, EventCompanion.BFF],
  comfortableLevel: EventComfortableLevel.NATURAL,
  reminderFrequency: ReminderFrequency.EVERY_30_MINUTES,
  reminderLeavingTime: [Date.now(), Date.now() + 30 * 60 * 1000],
  startReminderTime: [Date.now()],
};

describe('storageUtils', () => {
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

  describe('getMaxPerMonthGlasses', () => {
    it('returns null if no data is stored', async () => {
      const result = await getMaxPerMonthGlasses();
      expect(result).toBeNull();
    });

    it('returns the stored value', async () => {
      const testValue = 30;
      await saveMaxPerMonthGlasses(testValue);
      const result = await getMaxPerMonthGlasses();
      expect(result).toBe(testValue);
    });
  });

  describe('saveMaxPerMonthGlasses', () => {
    it('stores the value', async () => {
      const testValue = 30;
      await saveMaxPerMonthGlasses(testValue);
      const result = await AsyncStorage.getItem('@booze_max_glasses_per_month');
      expect(result).toBe(String(testValue));
    });
  });

  describe('getPreviousEvents', () => {
    it('returns null if no data is stored', async () => {
      const result = await getPreviousEvents();
      expect(result).toBeNull();
    });

    it('returns the stored events', async () => {
      const testEvents = [testEvent];
      await AsyncStorage.setItem('@booze_events', JSON.stringify(testEvents));
      const result = await getPreviousEvents();
      expect(result).toEqual(testEvents);
    });
  });

  describe('saveSingleEvent', () => {
    it('adds a new event to the storage', async () => {
      await saveSingleEvent(testEvent);
      const storedEvents = await getPreviousEvents();
      expect(storedEvents).toHaveLength(1);
      expect(storedEvents[0]).toEqual(testEvent);
    });
  });
});

describe('updateEvent', () => {
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

  it('should update an event if the event exists', async () => {
    // save an event
    await storeData('@booze_events', JSON.stringify([testEvent]));

    // update the event
    const updatedEvent: BoozyBFEvent = {
      ...testEvent,
      name: 'updated test event',
      date: new Date('2024-02-01').getTime(),
    };

    await updateEvent(updatedEvent);

    const storedEvents = await getPreviousEvents();
    expect(storedEvents).toHaveLength(1);
    expect(storedEvents[0]).toEqual(updatedEvent);
  });

  it('should not update any event and throw an exception if the event does not exist', async () => {
    // save an event
    await storeData('@booze_events', JSON.stringify([testEvent]));

    // update an event that doesn't exist
    const updatedEvent = {
      ...testEvent,
      id: 'abc',
      name: 'updated test event',
      date: new Date('2024-02-01').getTime(),
    };

    await expect(updateEvent(updatedEvent)).rejects.toThrow(
      `Event ${updatedEvent.id} doesn't not exist`
    );

    const storedEvents = await getPreviousEvents();
    expect(storedEvents).toHaveLength(1);
    expect(storedEvents[0]).toEqual(testEvent);
  });

  it('should not update any event if previous events do not exist', async () => {
    // update an event when there are no previous events
    const updatedEvent = {
      ...testEvent,
      name: 'updated test event',
      date: new Date('2024-02-01').getTime(),
    };

    await updateEvent(updatedEvent);
    const storedEvents = await getPreviousEvents();
    expect(storedEvents).toBeNull();
  });
});

describe('getSortedPreviousEvents', () => {
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

  it('should return an empty array when getPreviousEvents returns falsy value', async () => {
    jest.spyOn(api, 'getPreviousEvents').mockResolvedValueOnce(undefined);
    const result = await getSortedPreviousEvents();
    expect(result).toEqual([]);
  });

  it('should return an empty array when getPreviousEvents returns an empty array', async () => {
    jest.spyOn(api, 'getPreviousEvents').mockResolvedValueOnce([]);
    const result = await getSortedPreviousEvents();
    expect(result).toEqual([]);
  });

  it('should return an array sorted by date in descending order when getPreviousEvents returns an array with events', async () => {
    const events = [
      { id: '1', date: '2022-01-01' },
      { id: '2', date: '2021-12-31' },
      { id: '3', date: '2022-02-01' },
    ];
    const randomeEvents = generateRandomBoozyEvents(3);
    const adjustedEvents = randomeEvents.map((event, index) => ({
      ...event,
      id: events[index].id,
      date: new Date(events[index].date).getTime(),
    }));
    await api.saveMultipleEvents(adjustedEvents);
    const result = await getSortedPreviousEvents();
    expect(result.map((event) => ({ id: event.id, date: event.date }))).toEqual(
      [
        { id: '3', date: new Date('2022-02-01').getTime() },
        { id: '1', date: new Date('2022-01-01').getTime() },
        { id: '2', date: new Date('2021-12-31').getTime() },
      ]
    );
  });
});

describe('removeEvent', () => {
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

  it('should not call storeData when eventId is falsy', async () => {
    console.warn = jest.fn();
    jest.spyOn(api, 'getPreviousEvents').mockResolvedValueOnce([]);
    jest.spyOn(api, 'storeData');
    jest.spyOn(global.console, 'warn');
    await removeEvent('');
    expect(console.warn).toHaveBeenCalledWith('No events found');
    expect(api.storeData).not.toHaveBeenCalled();
  });

  it('should not call storeData when getPreviousEvents returns an empty array', async () => {
    jest.spyOn(api, 'getPreviousEvents').mockResolvedValueOnce([]);
    jest.spyOn(api, 'storeData');
    await removeEvent('1');
    expect(api.storeData).not.toHaveBeenCalled();
  });

  it('should not call storeData when eventId is not found', async () => {
    const events = generateRandomBoozyEvents(1);
    events[0] = {
      ...events[0],
      id: '1',
      date: new Date('2022-01-01').getTime(),
    };
    await saveSingleEvent(events[0]);
    jest.spyOn(api, 'storeData');
    jest.spyOn(global.console, 'warn');
    await removeEvent('2');
    await expect(await console.warn).toHaveBeenCalledWith(
      'Cannot find event 2'
    );
  });

  it('should call storeData with the remaining events when eventId is found', async () => {
    const events = [
      { id: '1', date: '2022-01-01' },
      { id: '2', date: '2021-12-31' },
      { id: '3', date: '2022-02-01' },
    ];
    const adjustedEvents = generateRandomBoozyEvents(3).map((event, index) => ({
      ...event,
      id: events[index].id,
      date: new Date(event.date).getTime(),
    }));
    jest.spyOn(api, 'saveMultipleEvents');
    jest.spyOn(api, 'removeEvent');
    jest.spyOn(api, 'storeData').mockResolvedValueOnce();
    jest.spyOn(api, 'getPreviousEvents');
    await api.saveMultipleEvents(adjustedEvents);
    expect(api.saveMultipleEvents).toHaveBeenCalled();
  });

  it('tests filtered sorted events', async () => {
    const randomEvents = generateRandomBoozyEvents(5);
    const events = [
      { id: '1', date: '01-01-2022' },
      { id: '2', date: '02-02-2022' },
      { id: '3', date: '04-04-2022' },
      { id: '4', date: '05-05-2022' },
      { id: '5', date: '02-12-2022' },
    ];

    const adjustedEvents: BoozyBFEvent[] = randomEvents.map((event, index) => ({
      ...event,
      id: events[index].id,
      name: 'Event ' + events[index].date,
      date: new Date(events[index].date).getTime(),
    }));

    await api.saveMultipleEvents(adjustedEvents);
    expect(api.saveMultipleEvents).toHaveBeenCalled();
    const result = await getSortedPreviousEvents();
    expect(result).toHaveLength(5);
    expect(result.map((e) => e.id)).toEqual(['4', '3', '5', '2', '1']);

    const firstFilteredResult = await getSortedPreviousEvents({
      minDate: new Date('01-01-2022'),
      maxDate: new Date('03-31-2022'),
    });
    expect(firstFilteredResult).toHaveLength(3);
    expect(firstFilteredResult).toMatchObject(
      sortArrayByDate(
        adjustedEvents.filter((event) => ['1', '2', '5'].includes(event.id))
      )
    );

    const secondFilteredResult = await getSortedPreviousEvents({
      minDate: new Date('04-01-2022'),
      maxDate: new Date('05-31-2022'),
    });
    expect(secondFilteredResult).toHaveLength(2);
    expect(secondFilteredResult).toMatchObject(
      sortArrayByDate(
        adjustedEvents.filter((event) => ['3', '4'].includes(event.id))
      )
    );
  });
});
