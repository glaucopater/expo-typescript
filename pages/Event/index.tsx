import React, { useState } from 'react';
import { Platform, Text, Vibration, View } from 'react-native';

import {
  removeEvent,
  removeRunningEvent,
  saveRunningEvent,
  saveSingleEvent,
  updateEvent,
} from '../../api';
import { BoozyBFEvent, BoozyBFEventStatus, Drink } from '../../api/models';
import { Breaker } from '../../components/Breaker';
import { CounterContainer } from '../../components/CounterContainer';
import { EditDrinkWrapper } from '../../components/EditDrinkWrapper';
import { EditEventNameWrapper } from '../../components/EventNameWrapper';
import { EventPurposeWrapper } from '../../components/EventPurposeWrapper';
import { GenericButton } from '../../components/GenericButton';
import { Hero } from '../../components/Hero';
import { MoneySpentWrapper } from '../../components/MoneySpentWrapper';
import { DEFAULT_CURRENCY, VIBRATION_QUICK } from '../../config';
import { ScrollViewWrapperTemplate } from '../../templates/ScrollViewWrapperTemplate';
import { ThemeColors } from '../../theme';
import { generateNewId, getRandonName } from '../../utils';
import { CompletedEvent } from './CompletedEvent';
import { styles } from './Event.styles';

export const Event = ({ navigation, route }) => {
  const [eventId, setEventId] = useState<string>(route?.params?.id || null);
  const [eventVersion, setEventVersion] = useState<number>(
    route?.params?.version || 0
  );

  const [eventGlasses, setEventGlasses] = useState<number>(
    route?.params?.numberOfGlasses || 0
  );

  const [eventDate, setEventDate] = useState<number>(
    route?.params?.date || new Date().getTime()
  );

  const [eventNameEditable, setEventNameEditable] = useState(false);

  const [eventName, setEventName] = useState<string>(
    route?.params?.name || 'Event ' + getRandonName()
  );

  const [eventMood, setEventMood] = useState<BoozyBFEvent['moodStatus']>(
    route?.params?.moodStatus || null
  );

  const [eventHangoverFeedback, setEventHangoverFeedback] = useState<
    BoozyBFEvent['hangoverFeedback']
  >(route?.params?.hangoverFeedback || null);

  const [eventAmount, setEventAmount] = useState<BoozyBFEvent['amount']>(
    route?.params?.amount || 0
  );

  const [eventCurrency, setEventCurrency] = useState<BoozyBFEvent['currency']>(
    route?.params?.currency || DEFAULT_CURRENCY
  );

  const [eventNotes, setEventNotes] = useState<BoozyBFEvent['notes']>(
    route?.params?.notes || null
  );

  const [eventStatus, setEventStatus] = useState<BoozyBFEvent['status']>(
    route?.params?.status || BoozyBFEventStatus.COMPLETED
  );

  const [eventPurpose, setEventPurpose] = useState<BoozyBFEvent['purpose']>(
    route?.params?.purpose || null
  );

  const [estimatedLeavingTime, setEstimatedLeavingTime] = useState<
    BoozyBFEvent['estimatedLeavingTime']
  >(route?.params?.estimatedLeavingTime || null);

  const [eventCompanion, setEventCompanion] = useState<
    BoozyBFEvent['companion']
  >(route?.params?.companion || null);

  const [eventDrinks, setEventDrinks] = useState<Drink[]>(
    route?.params?.drinks || []
  );

  const handleOnSaveDrinks = (drinks: Drink[]) => {
    setEventDrinks(drinks);
    setEventGlasses(
      drinks.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue.numberOfGlasses || 0),
        0
      )
    );
  };

  const handleOnDecreaseCounter = () => {
    setEventGlasses((prev) => prev - 1);
    if (Platform.OS !== 'web') {
      Vibration.vibrate(VIBRATION_QUICK);
    }
  };

  const handleOnIncreaseCounter = () => {
    setEventGlasses((prev) => prev + 1);
    if (Platform.OS !== 'web') {
      Vibration.vibrate(VIBRATION_QUICK);
    }
  };

  // upsert logic
  const handleOnSave = () => {
    const newEvent: BoozyBFEvent = {
      id: eventId ? eventId : generateNewId(),
      name: eventName,
      date: eventDate,
      moodStatus: eventMood,
      hangoverFeedback: eventHangoverFeedback,
      amount: eventAmount,
      currency: eventCurrency,
      numberOfGlasses: eventGlasses ?? 0,
      purpose: eventPurpose,
      notes: eventNotes,
      companion: eventCompanion,
      estimatedLeavingTime: estimatedLeavingTime,
      reminderFrequency: route?.params?.reminderFrequency || null,
      startReminderTime: route?.params?.startReminderTime || null,
      reminderLeavingTime: route?.params?.reminderLeavingTime || null,
      drinks: eventDrinks,
      lastUpdate: new Date().getTime(),
      version: !eventId ? eventVersion : eventVersion + 1,
      status: [BoozyBFEventStatus.PLANNED, BoozyBFEventStatus.RUNNING].includes(
        eventStatus
      )
        ? BoozyBFEventStatus.RUNNING
        : BoozyBFEventStatus.COMPLETED,
    };

    if (!eventId) {
      saveSingleEvent(newEvent);
    } else {
      if (newEvent.status === BoozyBFEventStatus.COMPLETED) {
        updateEvent(newEvent);
      } else {
        saveRunningEvent(newEvent);
      }
    }

    navigateHome();
  };

  const handleOnRemove = () => {
    if (eventId) {
      if (
        [
          BoozyBFEventStatus.COMPLETED,
          BoozyBFEventStatus.ALMOST_COMPLETED,
          BoozyBFEventStatus.RUNNING,
        ].includes(eventStatus)
      ) {
        removeEvent(eventId);
      } else {
        removeRunningEvent();
      }
    }
    navigateHome({ message: 'event removed' });
  };

  const navigateHome = (params?: any) => {
    setTimeout(() => {
      navigation.navigate('Home', { ...params });
    }, 500);
  };

  const handleOnEditEventName = () => {
    setEventNameEditable((prevState) => !prevState);
  };

  return (
    <ScrollViewWrapperTemplate
      forceAppReadyness
      rootStyle={styles.root}
      testID="event-page"
    >
      <Hero>
        <Text
          style={[
            styles.smallText,
            { color: ThemeColors.primary.white, fontSize: 18 },
          ]}
        >
          Drink Record
        </Text>
        <CounterContainer
          readonly
          numberOfGlasses={eventGlasses}
          handleOnDecreaseCounter={handleOnDecreaseCounter}
          setNumberOfGlasses={setEventGlasses}
          handleOnIncreaseCounter={handleOnIncreaseCounter}
        />
        <Text style={[styles.text, styles.smallText]}>Glasses</Text>
      </Hero>
      <View
        style={{
          width: '100%',
          padding: 18,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-around',
          }}
        >
          <Text
            style={[
              styles.smallText,
              {
                color: ThemeColors.primary.fadedDarlPurple,
                fontSize: 12,
                marginVertical: 8,
              },
            ]}
          >
            {new Date(eventDate).toLocaleDateString()}
          </Text>
          <EditEventNameWrapper
            setEventNameEditable={setEventNameEditable}
            setEventName={setEventName}
            eventName={eventName}
            eventNameEditable={eventNameEditable}
            handleOnEditEventName={handleOnEditEventName}
          />
        </View>
        <Breaker isActive={eventNameEditable} />
        {eventStatus !== BoozyBFEventStatus.COMPLETED && (
          <EventPurposeWrapper eventPurpose={eventPurpose} />
        )}
        {[
          BoozyBFEventStatus.COMPLETED,
          BoozyBFEventStatus.ALMOST_COMPLETED,
        ].includes(eventStatus) && (
          <CompletedEvent
            eventMood={eventMood}
            setEventMood={setEventMood}
            eventHangoverFeedback={eventHangoverFeedback}
            setEventHangoverFeedback={setEventHangoverFeedback}
            eventNotes={eventNotes}
            setEventNotes={setEventNotes}
          />
        )}
        <View>
          <EditDrinkWrapper
            eventDrinks={eventDrinks}
            setEventDrinks={handleOnSaveDrinks}
            navigation={navigation}
            route={route}
          />
          <MoneySpentWrapper
            eventAmount={eventAmount}
            setEventAmount={setEventAmount}
          />
        </View>
        <GenericButton
          testID="save-event-drink"
          label="Save"
          onClickEvent={handleOnSave}
          viewStyle={[
            styles.saveButton,
            eventGlasses === 0 ? styles.disabled : {},
          ]}
          isDisabled={eventGlasses === 0}
        />
        {eventId && (
          <GenericButton
            label="Remove Event"
            onClickEvent={handleOnRemove}
            viewStyle={{
              backgroundColor: 'transparent',
              width: '100%',
              borderWidth: 0,
              height: 56,
            }}
            textStyle={{
              color: ThemeColors.primary.octopus,
            }}
          />
        )}
      </View>
    </ScrollViewWrapperTemplate>
  );
};
