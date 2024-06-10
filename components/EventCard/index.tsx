import { ImageBackground, Pressable } from 'react-native';
import { Text, View } from 'react-native';

import { BoozyBFEvent } from '../../api/models';
import { ThemeColors } from '../../theme';
import { HangoverFeedbackBadge } from '../HangoverFeedbackBadge';
import { getMoodIconComponent } from '../MoodIconWrapper';

export const EventCard = ({
  event,
  navigation,
}: {
  event: BoozyBFEvent;
  navigation?: any;
}) => {
  return (
    <Pressable
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
          alignItems: 'flex-start',
          backgroundColor: ThemeColors.primary.white,
          borderRadius: 8,
          padding: 16,
        }}
      >
        {getMoodIconComponent(event.moodStatus)}
        <View
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            height: 66,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 0,
            marginRight: 0,
            marginBottom: 0,
            flexShrink: 1,
            alignSelf: 'auto',
            paddingHorizontal: 8,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <Text
              style={{
                color: ThemeColors.primary.fadedDarlPurple,
                height: 'auto',
                textAlign: 'left',
                marginRight: 0,
                marginBottom: 0,
                alignSelf: 'auto',
                fontFamily: 'Lato',
                fontSize: 12,
                paddingHorizontal: 8,
              }}
            >
              {new Date(event.date).toLocaleDateString()}
            </Text>
            <Text
              style={{
                color: ThemeColors.primary.darkPurple,
                width: '100%',
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

            <View
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: 24,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingHorizontal: 8,
                marginRight: 0,
                marginTop: 8,
                flexShrink: 1,
                alignSelf: 'auto',
              }}
            >
              <View
                style={{
                  backgroundColor: 'transparent',
                  height: 24,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  padding: 0,
                  flexShrink: 1,
                  alignSelf: 'auto',
                }}
              >
                <View
                  style={{
                    height: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: ThemeColors.primary.disabledGrey,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: ThemeColors.primary.darkPurple,
                        height: 'auto',
                        textAlign: 'left',
                        alignSelf: 'auto',
                        fontFamily: 'Lato',
                        fontSize: 12,
                        fontWeight: '900',
                      }}
                    >
                      {event.numberOfGlasses} glasses
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: 'transparent',
                  height: 24,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  padding: 0,
                  flexShrink: 1,
                  alignSelf: 'auto',
                  marginRight: 8,
                }}
              >
                <View
                  style={{
                    height: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: ThemeColors.primary.disabledGrey,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: ThemeColors.primary.darkPurple,
                        height: 'auto',
                        textAlign: 'left',
                        alignSelf: 'auto',
                        fontFamily: 'Lato',
                        fontSize: 12,
                        fontWeight: '900',
                      }}
                    >
                      {event.currency}
                      {event.amount ?? 0}
                    </Text>
                  </View>
                </View>
              </View>
              <HangoverFeedbackBadge
                hangoverFeedback={event.hangoverFeedback}
              />
            </View>
          </View>
        </View>
        <ImageBackground
          style={{
            width: 8,
            height: 12,
            alignSelf: 'center',
          }}
          source={require('../../assets/images/chevronRight.png')}
        />
      </View>
    </Pressable>
  );
};
