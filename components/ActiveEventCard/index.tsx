import { ImageBackground, Pressable } from 'react-native';
import { Text, View } from 'react-native';

import { RunningBoozyBFEvent } from '../../api/models';
import { ThemeColors } from '../../theme';
import { GlassesIcon, ReminderIcon } from '../Shared';

export const ActiveEventCard = ({
  event,
  navigation,
  isCompleteEvent,
}: {
  event: RunningBoozyBFEvent;
  navigation?: any;
  isCompleteEvent: boolean;
}) => {
  const adjustLeavingTimeDisplay = (reminderLeavingTime: number[]) => {
    const [hours, minutes] = reminderLeavingTime;

    return (
      (hours < 10 ? '0' + hours : hours) +
      ':' +
      (minutes < 10 ? '0' + minutes : minutes)
    );
  };

  return (
    <Pressable
      testID="active-event-card"
      style={{
        marginTop: 8,
      }}
      onPress={() => {
        navigation && navigation.navigate('EventsDetails', { ...event });
      }}
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: ThemeColors.primary.white,
          borderRadius: 8,
          padding: 16,
          borderColor: ThemeColors.primary.octopus,
          borderWidth: 1,
        }}
      >
        <View
          style={{
            width: 68,
            height: 68,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isCompleteEvent ? <GlassesIcon /> : <ReminderIcon />}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: 56,
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <Text
            style={{
              color: ThemeColors.primary.darkPurple,
              height: 'auto',
              textAlign: 'left',
              marginRight: 0,
              marginBottom: 0,
              alignSelf: 'auto',
              fontFamily: 'Lato',
              fontWeight: '700',
              fontSize: 12,
              lineHeight: 16,
              paddingHorizontal: 8,
            }}
          >
            {isCompleteEvent ? 'How was last event?' : 'Active Event'}
          </Text>
          <Text
            style={{
              color: ThemeColors.primary.darkPurple,
              height: 'auto',
              textAlign: 'left',
              alignSelf: 'auto',
              fontFamily: 'Lato',
              fontSize: 16,
              fontWeight: '900',
              paddingHorizontal: 8,
            }}
          >
            {event.name}
          </Text>
          <Text
            style={{
              color: ThemeColors.primary.octopus,
              height: 'auto',
              textAlign: 'left',
              marginRight: 0,
              marginBottom: 0,
              alignSelf: 'auto',
              fontFamily: 'Lato',
              fontSize: 12,
              paddingHorizontal: 8,
              fontWeight: '700',
            }}
          >
            {isCompleteEvent
              ? 'Complete my event diary'
              : 'Leaving Time ' +
                (event.reminderLeavingTime
                  ? adjustLeavingTimeDisplay(event.reminderLeavingTime)
                  : '...')}
          </Text>
        </View>
        <ImageBackground
          style={{
            width: 24,
            height: 24,
            alignSelf: 'flex-start',
          }}
          source={require('../../assets/images/crossIcon.png')}
        />
      </View>
    </Pressable>
  );
};
