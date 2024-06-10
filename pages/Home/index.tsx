import { useFocusEffect } from '@react-navigation/native';
import { getLocales } from 'expo-localization';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  getMaxPerMonthGlasses,
  getPreviousEvents,
  getRunningEvent,
  saveUserDetails,
} from '../../api';
import {
  BoozyBFEvent,
  RunningBoozyBFEvent,
  UserDetails,
} from '../../api/models';
import { ActiveEventCard } from '../../components/ActiveEventCard';
import { EventCard } from '../../components/EventCard';
import { Hero } from '../../components/Hero';
import NavigationBar from '../../components/NavigationBar';
import { ProgressBar } from '../../components/ProgressBar';
import { OnboardingIcon, ReminderActiveIcon } from '../../components/Shared';
import Track from '../../components/Track';
import { ScrollViewWrapperTemplate } from '../../templates/ScrollViewWrapperTemplate';
import { ThemeColors } from '../../theme';
import {
  countUniqueDays,
  getChartData,
  getMostRecentEvent,
  getTotalAmount,
  getTotalGlasses,
  sortArrayByDate,
} from '../../utils';
import { styles } from './Home.styles';
import { CustomLineChart, mockData } from '../../components/Chart/CustomBarChart';

export const Home = ({ navigation }) => {
  const [lastEvents, setLastEvents] = useState<BoozyBFEvent[]>();
  const [currentGlassesCounter, setCurrentGlassesCounter] = useState(0);
  const [glassesTotalAmount, setGlassesTotalAmount] = useState(0);
  const [eventsCounter, setEventsCounter] = useState(0);
  const [maxPerMonthGlassesCounter, setPerMonthGlassesCounter] = useState(0);
  const [textInputValue, setTextInputValue] = useState(0);
  const [moreRecentEvent, setMoreRecentEvent] = useState<
    BoozyBFEvent | undefined
  >();
  const [currentRunningEvent, setCurrentRunningEvent] = useState<
    RunningBoozyBFEvent | undefined
  >();

  const fetchData = async () => {
    const previousEvents: BoozyBFEvent[] = sortArrayByDate(
      (await getPreviousEvents()) || []
    );

    const maxPerMonthGlassesdata = await getMaxPerMonthGlasses();
    const glassesTotalSum = previousEvents?.length
      ? getTotalGlasses(previousEvents)
      : 0;
    const glassesTotalAmount = getTotalAmount(previousEvents).toFixed(2);
    const moreRecentEvent = previousEvents?.length
      ? getMostRecentEvent(previousEvents)
      : undefined;

    const storedRunningEvent: RunningBoozyBFEvent = await getRunningEvent();

    return {
      eventsCounter:
        previousEvents && Object.values(countUniqueDays(previousEvents))?.length
          ? Object.values(countUniqueDays(previousEvents)).length
          : 0,
      currentGlasses: glassesTotalSum,
      maxPerMonthGlasses: Number(maxPerMonthGlassesdata),
      glassesTotalAmount,
      moreRecentEvent,
      storedRunningEvent,
    };
  };

  const reloadDataAfterFetch = () => {
    fetchData()
      .then(
        ({
          eventsCounter,
          currentGlasses,
          maxPerMonthGlasses,
          glassesTotalAmount,
          moreRecentEvent,
          storedRunningEvent,
        }) => {
          if (eventsCounter) setEventsCounter(eventsCounter);
          if (currentGlasses) setCurrentGlassesCounter(currentGlasses);
          if (maxPerMonthGlasses) {
            setPerMonthGlassesCounter(maxPerMonthGlasses);
            setTextInputValue(maxPerMonthGlasses);
          }
          if (glassesTotalAmount)
            setGlassesTotalAmount(Number(glassesTotalAmount));
          if (moreRecentEvent) setMoreRecentEvent(moreRecentEvent);
          if (storedRunningEvent) setCurrentRunningEvent(storedRunningEvent);
          else if (!storedRunningEvent)
            setCurrentRunningEvent(storedRunningEvent);
        }
      )
      .catch(console.error);
  };

  useEffect(() => {
    reloadDataAfterFetch();
  }, [maxPerMonthGlassesCounter]);

  useFocusEffect(
    React.useCallback(() => {
      useFocusEffect;
      reloadDataAfterFetch();
      handleOnLoadData();
    }, [navigation])
  );

  const handleOnLoadData = async () => {
    // storing current user details
    const userLocales = getLocales();
    if (userLocales?.[0]) {
      const { languageTag, decimalSeparator, regionCode } = userLocales[0];
      const userDetails: UserDetails = {
        languageTag,
        decimalSeparator,
        regionCode,
      };
      await saveUserDetails(userDetails);
    }

    const lastEvents: BoozyBFEvent[] = (await getPreviousEvents()) || [];
    const sortedEvents = sortArrayByDate(lastEvents);

    if (sortedEvents) {
      setLastEvents(sortedEvents.splice(0, 2));
    } else setLastEvents([]);

    // force cleanup of running event
  };

  return (
    <ScrollViewWrapperTemplate
      forceAppReadyness
      rootStyle={styles.root}
      testID="home-page"
      navigationBar={
        <NavigationBar
          navigation={navigation}
          isReminderEnabled={!!currentRunningEvent}
        />
      }
    >
      <Hero>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Pressable
            style={{
              width: 48,
            }}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          >
            <OnboardingIcon />
          </Pressable>
          <Text
            style={{
              fontFamily: 'Suez-One',
              fontWeight: '400',
              fontSize: 14,
              padding: 8,
              color: ThemeColors.primary.white,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            Total monthly drinks
          </Text>
          {currentRunningEvent ? (
            <Pressable
              onPress={() => {
                navigation.navigate('LeavingTime', {
                  event: currentRunningEvent,
                });
              }}
              style={{
                alignSelf: 'flex-end',
              }}
            >
              <ReminderActiveIcon />
            </Pressable>
          ) : (
            <View
              style={{
                width: 48,
                opacity: 0,
              }}
            ></View>
          )}
        </View>
        <Text
          style={{
            fontFamily: 'Lato',
            padding: 8,
            color: ThemeColors.primary.white,
            fontSize: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          testID="current-glasses-counter"
        >
          {currentGlassesCounter}
        </Text>
        <Text
          style={{
            fontFamily: 'Lato',
            padding: 8,
            color: 'white',
            fontSize: 18,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Glasses
        </Text>
      </Hero>
      <ProgressBar
        glassesTotalAmount={maxPerMonthGlassesCounter}
        currentGlassesCounter={currentGlassesCounter}
      />
      <View
        style={{
          marginVertical: 8,
          paddingHorizontal: 20,
        }}
      >
        {!!currentRunningEvent && currentRunningEvent && (
          <ActiveEventCard
            navigation={navigation}
            event={currentRunningEvent}
            isCompleteEvent={false}
          />
        )}
      </View>
      <Track
        eventsCounter={eventsCounter}
        currentGlasses={currentGlassesCounter}
        maxGlassesPerMonth={maxPerMonthGlassesCounter}
        glassesTotalAmount={glassesTotalAmount}
        moreRecentEvent={moreRecentEvent}
        textInputValue={textInputValue}
      />

      {lastEvents?.length === 0 && (
        <View
          style={{
            display: 'flex',
            padding: 20,
            marginBottom: 104,
          }}
        />
      )}
      {lastEvents?.length > 0 && (
        <View
          style={{
            display: 'flex',
            padding: 20,
            marginBottom: 104,
          }}
        >
          <Text
            style={{
              fontFamily: 'Suez-One',
              padding: 8,
              fontSize: 18,
            }}
          >
            Past Events
          </Text>
          {lastEvents?.map((event, index) => (
            <EventCard event={event} key={index} navigation={navigation} />
          ))}
          <View
            style={{
              display: 'flex',
              marginTop: 16, 
              }}
          >
            <CustomLineChart data={getChartData(lastEvents)} />
          </View>
        </View>
      )}
    </ScrollViewWrapperTemplate>
  );
};
