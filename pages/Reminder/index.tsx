import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Platform,
  Pressable,
  Text,
  TextInput,
  Vibration,
  View,
} from 'react-native';

import {
  getRunningEvent,
  removeRunningEvent,
  saveRunningEvent,
} from '../../api';
import {
  BoozyBFEventStatus,
  EventComfortableLevel,
  EventCompanion,
  EventPurpose,
  ReminderFrequency,
  RunningBoozyBFEvent,
} from '../../api/models';
import { ComfortableSlider } from '../../components/ComfortableSlider';
import {
  cancelScheduledNotification,
  schedulePushNotification,
} from '../../components/PushNotificationCreator';
import { ReminderButton } from '../../components/ReminderButton';
import { ReminderCounter } from '../../components/ReminderCounter';
import { ReminderPurpose } from '../../components/ReminderPurpose';
import { VIBRATION_MEDIUM, VIBRATION_QUICK } from '../../config';
import { ScrollViewWrapperTemplate } from '../../templates/ScrollViewWrapperTemplate';
import { FontText, ThemeColors } from '../../theme';
import { generateNewId, getLeavingTime } from '../../utils';
import { styles } from './Reminder.styles';

SplashScreen.preventAutoHideAsync();

export const Reminder = ({ navigation, route }) => {
  const [currentEventId, setCurrentEventId] = useState<
    RunningBoozyBFEvent['id']
  >(route?.params?.id || generateNewId());

  const [currentEventName, setCurrentEventName] = useState<
    RunningBoozyBFEvent['name']
  >(route?.params?.name || "Today's Event");

  const [currentEventDate, setCurrentEventDate] = useState<
    RunningBoozyBFEvent['date']
  >(route?.params?.date || new Date().getTime());

  const [currentEventCompanionTypes, setCurrentEventCompanionTypes] = useState<
    RunningBoozyBFEvent['companion']
  >(route?.params?.companion || [EventCompanion.FRIENDS]);

  const [currentEventPurpose, setCurrentEventPurpose] = useState<
    RunningBoozyBFEvent['purpose']
  >(route?.params?.purpose || EventPurpose.RELAX);

  const [currentEventComfortableLevel, setCurrentEventComfortableLevel] =
    useState<RunningBoozyBFEvent['comfortableLevel']>(
      route?.params?.comfortableLevel || EventComfortableLevel.NATURAL
    );

  const [currentEventStatus, setCurrentEventStatus] = useState<
    RunningBoozyBFEvent['status']
  >(route?.params?.status || BoozyBFEventStatus.PLANNED);

  const [reminderSelection, setReminderSelection] = useState<
    RunningBoozyBFEvent['reminderFrequency']
  >(route?.params?.reminderFrequency || ReminderFrequency.EVERY_30_MINUTES);

  const [currentEventNumberOfGlasses, setCurrentEventNumberOfGlasses] =
    useState<RunningBoozyBFEvent['numberOfGlasses']>(
      route?.params?.numberOfGlasses || 0
    );

  const proposedleavingTime = getLeavingTime(2);
  const [currentEventReminderLeavingTime, setCurrentEventReminderLeavingTime] =
    useState(proposedleavingTime);

  const proposedStartReminderTime = getLeavingTime(1);
  const [currentEventStartReminderTime, setCurrentEventStartReminderTime] =
    useState(proposedStartReminderTime);

  const [eventNameEditable, setEventNameEditable] = useState(false);
  const [runningEvent, setRunningEvent] =
    useState<RunningBoozyBFEvent | null>();

  const [currentEstimatedLeavingTime, setCurrentEstimatedLeavingTime] =
    useState<RunningBoozyBFEvent['estimatedLeavingTime']>(
      route?.params?.estimatedLeavingTime ||
        new Date().getTime() + 1000 * 60 * 60 * 2
    );

  const handleOnLoadData = async () => {
    const currentRunningEvent: RunningBoozyBFEvent = await getRunningEvent();

    if (currentRunningEvent) {
      setRunningEvent(currentRunningEvent);
      setCurrentEventId(currentRunningEvent.id);
      setCurrentEventName(currentRunningEvent.name);
      setCurrentEventDate(currentRunningEvent.date);
      setCurrentEventPurpose(currentRunningEvent.purpose);
      setCurrentEventCompanionTypes(currentRunningEvent.companion);
      setCurrentEventComfortableLevel(currentRunningEvent.comfortableLevel);
      setCurrentEventReminderLeavingTime(
        currentRunningEvent.reminderLeavingTime
      );
      setCurrentEventStartReminderTime(currentRunningEvent.startReminderTime);
      setCurrentEventNumberOfGlasses(currentRunningEvent.numberOfGlasses);
      setCurrentEstimatedLeavingTime(currentRunningEvent.estimatedLeavingTime);
    }
  };

  useEffect(() => {
    handleOnLoadData();
  }, []);

  const handleOnDone = async () => {
    const runningEvent: RunningBoozyBFEvent = {
      id: currentEventId,
      date: currentEventDate,
      name: currentEventName,
      purpose: currentEventPurpose,
      companion: currentEventCompanionTypes,
      status: currentEventStatus,
      comfortableLevel: currentEventComfortableLevel,
      reminderFrequency: reminderSelection,
      reminderLeavingTime: currentEventReminderLeavingTime,
      startReminderTime: currentEventStartReminderTime,
      numberOfGlasses: currentEventNumberOfGlasses,
      estimatedLeavingTime: currentEstimatedLeavingTime,
      lastUpdate: null,
    };

    saveRunningEvent(runningEvent);

    if (Platform.OS !== 'web') {
      // delete previous notification

      await cancelScheduledNotification();

      await schedulePushNotification(
        reminderSelection,
        currentEventReminderLeavingTime
      );
      Vibration.vibrate(VIBRATION_QUICK);
    }

    setTimeout(() => {
      navigation.navigate('Home');
    }, 500);
  };

  const handleOnCancelNotification = async () => {
    await removeRunningEvent();
    if (Platform.OS !== 'web') {
      await cancelScheduledNotification();
      Vibration.vibrate(VIBRATION_MEDIUM);
    }

    setTimeout(() => {
      navigation.navigate('Home', {});
    }, 1000);
  };

  const handleOnSelectCompanionType = (
    _e: any,
    companionType: EventCompanion
  ) => {
    if (currentEventCompanionTypes?.includes(companionType))
      setCurrentEventCompanionTypes(
        currentEventCompanionTypes.filter(
          (companionType) => companionType !== companionType
        )
      );
    else
      setCurrentEventCompanionTypes([
        ...currentEventCompanionTypes,
        companionType,
      ]);
  };

  const handleOnSelectEventPurpose = (_e: any, eventPurpose: EventPurpose) => {
    setCurrentEventPurpose(eventPurpose);
  };

  const handleOnEditEventName = () => {
    setEventNameEditable((prevState) => !prevState);
  };

  const handleOnSelectEventComfortableLevel = (
    comfortableLevel: EventComfortableLevel
  ) => {
    setCurrentEventComfortableLevel(comfortableLevel);
  };

  return (
    <ScrollViewWrapperTemplate
      rootStyle={styles.root}
      testID="reminder-page"
      forceAppReadyness
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          backgroundColor: ThemeColors.primary.darkPurple,
          padding: 16,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <Text style={[FontText.title1, { color: ThemeColors.primary.white }]}>
            Today&apos;s Event
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'space-between',
                justifyContent: 'space-between',
              }}
            >
              {eventNameEditable ? (
                <TextInput
                  style={[
                    FontText.title1,
                    {
                      fontSize: 24,
                      color: ThemeColors.primary.white,
                    },
                    styles.isEditable,
                  ]}
                  placeholderTextColor={ThemeColors.primary.white}
                  value={currentEventName}
                  onChangeText={(data) => setCurrentEventName(data)}
                  underlineColorAndroid="transparent"
                />
              ) : (
                <Text
                  style={[
                    FontText.title1,
                    {
                      fontSize: 24,
                      color: ThemeColors.primary.white,
                    },
                  ]}
                >
                  {currentEventName}
                </Text>
              )}
              <Pressable onPress={handleOnEditEventName}>
                <ImageBackground
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  source={require('../../assets/images/editWhite.png')}
                />
              </Pressable>
            </View>
          </View>
          <Text style={[FontText.title1, { color: ThemeColors.primary.white }]}>
            {new Date(currentEventDate).toLocaleDateString()}
          </Text>
        </View>
        <Text style={[FontText.title1, { color: ThemeColors.primary.white }]}>
          Who are you going with?
        </Text>
        <Text style={[FontText.title3, { color: ThemeColors.primary.white }]}>
          You can choose multiple
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignContent: 'center',
            marginVertical: 16,
            width: '100%',
          }}
        >
          {Object.values(EventCompanion).map((companionType, index) => (
            <ReminderButton
              key={index}
              onClickEvent={(e) =>
                handleOnSelectCompanionType(e, companionType)
              }
              label={companionType}
              isSelected={
                currentEventCompanionTypes &&
                currentEventCompanionTypes.includes(companionType)
              }
            />
          ))}
        </View>

        <View>
          <Text style={[FontText.title1, { color: ThemeColors.primary.white }]}>
            My Comfortable level
          </Text>
          <Text style={[FontText.title3, { color: ThemeColors.primary.white }]}>
            How Comfortable are you with these people
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginVertical: 16,
            }}
          >
            {currentEventComfortableLevel && (
              <ComfortableSlider
                comfortableLevel={currentEventComfortableLevel}
                onChange={handleOnSelectEventComfortableLevel}
              />
            )}
          </View>
        </View>
        <View
          style={{
            marginVertical: 16,
          }}
        >
          <Text style={[FontText.title1, { color: ThemeColors.primary.white }]}>
            My Purpose
          </Text>
          <ReminderPurpose
            onSelect={handleOnSelectEventPurpose}
            currentEventPurpose={currentEventPurpose}
          />
        </View>

        <View>
          <Text style={[FontText.title1, { color: ThemeColors.primary.white }]}>
            Set Reminder
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              paddingVertical: 16,
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <ReminderCounter
              isStart
              title="Start Remind my level at"
              reminderSelection={reminderSelection}
              timer={currentEventStartReminderTime}
              setReminderSelection={setReminderSelection}
            />
            <ReminderCounter
              title="Leaving time"
              timer={currentEventReminderLeavingTime}
              setReminderLeavingTime={setCurrentEventReminderLeavingTime}
              setCurrentEstimatedLeavingTime={setCurrentEstimatedLeavingTime}
            />
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignContent: 'center',
            alignItems: 'center',
            paddingVertical: 16,
            width: '100%',
          }}
        >
          <ReminderButton
            onClickEvent={handleOnDone}
            label="Done and Save Event"
            viewStyle={{
              width: '100%',
              marginTop: 16,
              backgroundColor: ThemeColors.primary.octopus,
              height: 64,
              alignSelf: 'center',
            }}
            textStyle={{
              fontFamily: 'Lato',
              fontWeight: 'bold',
            }}
          />
          <ReminderButton
            onClickEvent={handleOnCancelNotification}
            label="Cancel notification"
            viewStyle={{
              width: '100%',
              marginTop: 16,
              backgroundColor: 'transparent',
              height: 64,
              alignSelf: 'center',
              borderColor: ThemeColors.primary.octopus,
            }}
            textStyle={{
              fontFamily: 'Lato',
              fontWeight: 'bold',
              color: ThemeColors.primary.octopus,
            }}
          />
        </View>
      </View>
    </ScrollViewWrapperTemplate>
  );
};
