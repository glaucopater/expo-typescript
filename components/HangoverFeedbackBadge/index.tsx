import { Image, Text, View } from 'react-native';

import { HangoverFeedback } from '../../api/models';
import { ThemeColors } from '../../theme';

export const HangoverFeedbackBadge = ({
  hangoverFeedback,
}: {
  hangoverFeedback: HangoverFeedback;
}) => {
  let badgeContent = '';
  let backgroundColor = '';

  switch (hangoverFeedback) {
    case HangoverFeedback.BAD: {
      badgeContent = 'Hangover';
      backgroundColor = ThemeColors.tags.bad;
      break;
    }
    case HangoverFeedback.MILD: {
      badgeContent = 'Tired';
      backgroundColor = ThemeColors.tags.medium;
      break;
    }
    case HangoverFeedback.FRESH:
    default: {
      badgeContent = 'Fresh';
      backgroundColor = ThemeColors.tags.good;
      break;
    }
  }

  return (
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
        marginRight: 4,
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
            backgroundColor: backgroundColor,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 4,
          }}
        >
          <Image
            style={{
              width: 16,
              height: 16,
              marginRight: 2,
            }}
            source={require('../../assets/images/sunIcon.png')}
          />
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
            {badgeContent}
          </Text>
        </View>
      </View>
    </View>
  );
};
