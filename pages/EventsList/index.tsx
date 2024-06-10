import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';

import { getRunningEvent, getSortedPreviousEvents } from '../../api';
import { BoozyBFEvent, BoozyBFEventStatus } from '../../api/models';
import { ActiveEventCard } from '../../components/ActiveEventCard';
import { EventCard } from '../../components/EventCard';
import { GenericButton } from '../../components/GenericButton';
import NavigationBar from '../../components/NavigationBar';
import { TimeFilterModal } from '../../components/TimeFilterModal';
import { DEFAULT_LOCALE } from '../../config';
import { ScrollViewWrapperTemplate } from '../../templates/ScrollViewWrapperTemplate';
import { ThemeColors } from '../../theme';
import { getMonthBounds, getShortMonthNames } from '../../utils';
import { styles } from './EventsList.styles';

export const EventsList = ({ navigation }) => {
  const [currentEvents, setCurrentEvents] = useState<BoozyBFEvent[]>();
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentMonth, setCurrentMonth] = useState<string>(
    new Date().toLocaleString(DEFAULT_LOCALE, { month: 'short' })
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const handleSetCurrentFilter = (year: number, month: string) => {
    setCurrentYear(() => year);
    setCurrentMonth(() => month);
  };

  const handleOnOpenCalendar = () => {
    setModalVisible(() => !modalVisible);
  };

  const handleResetTimeFilter = async () => {
    const previousEvents = await getSortedPreviousEvents();
    if (previousEvents) {
      setCurrentEvents(previousEvents);
    } else setCurrentEvents([]);
  };

  const handleOnLoadData = async () => {
    const currentMonthInNumbers = getShortMonthNames().map((month, index) => {
      if (month === currentMonth) return index;
    });
    const currentMonthInNumber = currentMonthInNumbers.filter(Boolean)[0];

    const { firstDay, lastDay } = getMonthBounds(
      currentYear,
      currentMonthInNumber + 1
    );
    const minDate = new Date(firstDay * 1000);
    const maxDate = new Date(lastDay * 1000);
    const previousEvents = await getSortedPreviousEvents({
      minDate,
      maxDate,
    });
    if (previousEvents) {
      setCurrentEvents(previousEvents);
    } else setCurrentEvents([]);
    const runningEvent = await getRunningEvent();
    if (runningEvent) {
      setIsReminderEnabled(true);
    }
  };

  useEffect(() => {
    handleOnLoadData();
  }, [currentYear, currentMonth]);

  const eventListCurrentTimeFilter = currentYear + ' ' + currentMonth;

  // giving for granted that the list is sorted correctly
  let almostCompletedEvent;

  if (
    currentEvents?.length > 0 &&
    currentEvents[0].status === BoozyBFEventStatus.ALMOST_COMPLETED
  ) {
    almostCompletedEvent = currentEvents[0];
  }

  const filteredCurrentEvents =
    (currentEvents?.length > 0 &&
      currentEvents.filter(
        (event) => event.status !== BoozyBFEventStatus.ALMOST_COMPLETED
      )) ||
    [];

  return (
    <>
      <TimeFilterModal
        modalVisible={modalVisible}
        setModalVisible={handleOnOpenCalendar}
        setCurrentFilter={handleSetCurrentFilter}
        month={new Date().getMonth()}
      />
      <ScrollViewWrapperTemplate
        forceAppReadyness={false}
        rootStyle={styles.root}
        testID="events-list"
        navigationBar={
          <NavigationBar
            navigation={navigation}
            isReminderEnabled={isReminderEnabled}
          />
        }
      >
        <View style={styles.header}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Pressable
              onPress={handleOnOpenCalendar}
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Suez-One',
                  fontSize: 20,
                  fontWeight: '400',
                  lineHeight: 24,
                  textAlign: 'center',
                  color: ThemeColors.primary.darkPurple,
                }}
              >
                {eventListCurrentTimeFilter}
              </Text>
              <ImageBackground
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 4,
                }}
                source={require('../../assets/images/chevronSmallDown.png')}
              />
            </Pressable>
            <View
              style={{
                alignItems: 'flex-start',
              }}
            >
              {currentEvents?.length > 0 && (
                <Text
                  style={{
                    fontFamily: 'Lato',
                    fontSize: 12,
                    fontWeight: '700',
                    lineHeight: 16,
                    textAlign: 'center',
                    color: ThemeColors.primary.fadedDarlPurple,
                  }}
                >
                  {currentEvents.length} drink days this month
                </Text>
              )}
            </View>
          </View>
          <View>
            <GenericButton
              onClickEvent={handleResetTimeFilter}
              label="Show All Events"
            />
          </View>
        </View>

        <View style={styles.eventsList}>
          {almostCompletedEvent && (
            <ActiveEventCard
              key={-1}
              isCompleteEvent
              event={almostCompletedEvent}
              navigation={navigation}
            />
          )}
          {filteredCurrentEvents?.map((event, index) => (
            <EventCard event={event} key={index} navigation={navigation} />
          ))}
        </View>
      </ScrollViewWrapperTemplate>
    </>
  );
};
