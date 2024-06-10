import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_CURRENCY } from '../config';
import { getDaysAgoFromNow, sortArrayByDate } from '../utils';
import {
  AppDetails,
  BoozyBFEvent,
  BoozyBFEventStatus,
  HangoverFeedback,
  MoodFeedback,
  RunningBoozyBFEvent,
  UserDetails,
  UserGoals,
} from './models';

const getDataByKey = async (storageKey: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const getAllData = async () => {
  try {
    const jsonKeys: readonly string[] = await AsyncStorage.getAllKeys();
    const jsonBackup = await jsonKeys.map((key) => getDataByKey(key));
    return jsonBackup ?? null;
  } catch (e) {
    // error reading value
  }
};

export const getMaxPerMonthGlasses = () =>
  getDataByKey('@booze_max_glasses_per_month');

export const saveMaxPerMonthGlasses = (value: number) =>
  storeData('@booze_max_glasses_per_month', String(value));

export const getPreviousEvents = () => getDataByKey('@booze_events');

export const saveMultipleEvents = async (events: BoozyBFEvent[]) => {
  const sortedEvents = sortArrayByDate(events);
  return await storeData('@booze_events', JSON.stringify(sortedEvents));
};

export const saveSingleEvent = async (event: BoozyBFEvent) => {
  const previousEvents = (await getPreviousEvents()) || [];
  const eventsUpdated = [...previousEvents, event];
  const sortedEvents = sortArrayByDate(eventsUpdated);
  return await storeData('@booze_events', JSON.stringify(sortedEvents));
};

// find and update an existing event, lookup by event id
export const updateEvent = async (event: BoozyBFEvent) => {
  const previousEvents = (await getPreviousEvents()) || [];
  // clean previous one
  if (previousEvents?.length > 0 && event.id) {
    //if it exists
    const toBeUpdated = previousEvents.find((evt) => evt.id === event.id);
    if (toBeUpdated) {
      const theOtherEvents = previousEvents.filter(
        (evt) => evt.id !== event.id
      );
      const eventsUpdated = [...theOtherEvents, event];
      const sortedEvents = sortArrayByDate(eventsUpdated);
      return await storeData('@booze_events', JSON.stringify(sortedEvents));
    } else throw new Error(`Event ${event.id} doesn't not exist`);
  }
};

export const getSortedPreviousEvents = async (filter?: {
  minDate: Date;
  maxDate: Date;
}) => {
  const previousEvents = (await getPreviousEvents()) || [];
  if (filter) {
    // return events considering the filter
    const filteredEvents = previousEvents.filter(
      (event) =>
        event.date >= filter.minDate.getTime() &&
        event.date < filter.maxDate.getTime()
    );
    return filteredEvents ? sortArrayByDate(filteredEvents) : [];
  } else return previousEvents ? sortArrayByDate(previousEvents) : [];
};

export const removeEvent = async (eventId: BoozyBFEvent['id']) => {
  const previousEvents = (await getPreviousEvents()) || [];
  if (previousEvents?.length > 0 && eventId) {
    const theOtherEvents = previousEvents.filter((evt) => evt.id !== eventId);
    if (theOtherEvents.length === previousEvents.length)
      console.warn(`Cannot find event ${eventId}`);
    return await storeData('@booze_events', JSON.stringify(theOtherEvents));
  } else console.warn(`No events found`);
};

// only one at the time
export const saveRunningEvent = async (runningEvent: RunningBoozyBFEvent) => {
  return await storeData('@booze_running_event', JSON.stringify(runningEvent));
};

export const completeRunningEvent = async () => {
  const runningEvent: RunningBoozyBFEvent = await getDataByKey(
    '@booze_running_event'
  );
  if (runningEvent) {
    const adaptedEvent: BoozyBFEvent = {
      ...runningEvent,
      numberOfGlasses: runningEvent.numberOfGlasses ?? 0,
      moodStatus: MoodFeedback.HAPPY,
      status: BoozyBFEventStatus.ALMOST_COMPLETED,
      amount: 0,
      hangoverFeedback: HangoverFeedback.FRESH,
      currency: DEFAULT_CURRENCY,
    };
    saveSingleEvent(adaptedEvent);
    removeRunningEvent();
  }
};

export const getRunningEvent = async () => {
  const runningEvent: RunningBoozyBFEvent = await getDataByKey(
    '@booze_running_event'
  );

  if (runningEvent) {
    if (getDaysAgoFromNow(runningEvent.date) > 1) {
      completeRunningEvent();
    }
    return runningEvent;
  }
};

export const removeRunningEvent = async () => {
  await AsyncStorage.removeItem('@booze_running_event');
};

export const saveGoals = async (goal: UserGoals) => {
  return await storeData('@booze_goals', JSON.stringify(goal));
};

export const getCurrentGoal = () => getDataByKey('@booze_goals');

export const saveIsOnboarded = async () => {
  return await storeData('@booze_is_onboarded', JSON.stringify(true));
};

export const getIsOnboarded = () => getDataByKey('@booze_is_onboarded');

export const resetOnboarding = async () => {
  await AsyncStorage.removeItem('@booze_is_onboarded');
};

export const storeData = async (storageKey: string, value: string) => {
  try {
    await AsyncStorage.setItem(storageKey, String(value));
  } catch (e) {
    // saving error
    console.warn('Error', e);
  }
};

export const clearEvents = async () => {
  try {
    await AsyncStorage.removeItem('@booze_events');
  } catch (e) {
    // error
    console.warn('Error clearing events', e);
  }
};

export const saveUserDetails = (user: UserDetails) =>
  storeData('@booze_user_details', JSON.stringify(user));

export const getUserDetails = () => getDataByKey('@booze_user_details');

export const saveAppDetails = (app: AppDetails) =>
  storeData('@booze_app_details', JSON.stringify(app));

export const getAppDetails = (): Promise<AppDetails> =>
  getDataByKey('@booze_app_details');

export const saveBackup = () => {
  const backup = getAllData();
  if (backup)
    storeData('@backup' + new Date().getTime(), JSON.stringify(backup));
};
