import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Platform, Vibration, View } from 'react-native';

import appPackage from '../../../package.json';
import { BoozyBFEvent, ReminderFrequency } from '../../api/models';
import { NOTIFICATION_TRIGGER_SECONDS, VIBRATION_MEDIUM } from '../../config';
import { adjustTimeDisplayFull, getSecondsFromFrequency } from '../../utils';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const getNotificationContent = (
  appPackageName: string,
  leavingTime: BoozyBFEvent['reminderLeavingTime'],
  notificationFrequency: number
) => ({
  title: `${appPackageName} 🍸`,
  body:
    'Drink some water!' +
    (leavingTime ? ' - Leaving at ' + adjustTimeDisplayFull(leavingTime) : '') +
    ' - Next notification in ' +
    Math.floor(notificationFrequency / 60) +
    ' minutes ',
});

export async function cancelScheduledNotification() {
  const data = await Notifications.getAllScheduledNotificationsAsync();

  if (data) {
    data.forEach((n) => {
      Notifications.cancelScheduledNotificationAsync(n.identifier);
    });
  }
}

export async function schedulePushNotificationForIOS(
  secondsFrequency: number,
  leavingTime?: BoozyBFEvent['reminderLeavingTime']
) {
  await Notifications.scheduleNotificationAsync({
    content: getNotificationContent(
      appPackage.name,
      leavingTime,
      secondsFrequency ?? NOTIFICATION_TRIGGER_SECONDS
    ),
    trigger: { seconds: secondsFrequency ?? NOTIFICATION_TRIGGER_SECONDS },
  });
}

export async function getiOSNotificationPermission() {
  // @ts-ignore
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  alert(status);
  if (status !== 'granted') {
    // @ts-ignore
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

export async function schedulePushNotification(
  frequency?: ReminderFrequency,
  leavingTime?: BoozyBFEvent['reminderLeavingTime']
) {
  const frequencySeconds = frequency
    ? getSecondsFromFrequency(frequency)
    : NOTIFICATION_TRIGGER_SECONDS;

  if (Platform.OS === 'ios') {
    getiOSNotificationPermission();
    schedulePushNotificationForIOS(frequencySeconds);
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('notification-channel', {
      name: 'Notification channel',
      importance: Notifications.AndroidImportance.HIGH,
    });

    await Notifications.scheduleNotificationAsync({
      content: getNotificationContent(
        appPackage.name,
        leavingTime,
        frequencySeconds
      ),
      trigger: {
        repeats: true,
        seconds: frequencySeconds,
        channelId: 'notification-channel', // <- for Android 8.0+, see definition above
      },
    });
  }
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('notification-channel-1', {
      name: 'Notification channel 1',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      // vibrate: true,
    });

    const leavingTime = [0, 0];

    await Notifications.scheduleNotificationAsync({
      content: getNotificationContent(
        appPackage.name,
        leavingTime,
        NOTIFICATION_TRIGGER_SECONDS
      ),
      trigger: {
        seconds: NOTIFICATION_TRIGGER_SECONDS,
        repeats: true,
        channelId: 'notification-channel-1',
      },
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default function PushNotificactionCreator() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  /*
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        //console.log("notification", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        //console.log("response", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  */

  return (
    <View
      style={{
        marginVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Button
        disabled={isScheduled}
        title="Schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
          setIsScheduled(true);
        }}
      />
      <Button
        disabled={!isScheduled}
        title="Cancel notification"
        onPress={async () => {
          if (Platform.OS !== 'web') {
            await cancelScheduledNotification();
            Vibration.vibrate(VIBRATION_MEDIUM);
          }
          setIsScheduled(false);
        }}
      />
    </View>
  );
}
