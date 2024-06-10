import { Text, View, ViewStyle } from 'react-native';

import { EventComfortableLevel, MoodFeedback } from '../../api/models';
import { FontText } from '../../theme';
import {
  ActiveEmojiCheckIcon,
  AggressiveIcon,
  ConfidentIcon,
  HappyIcon,
  NaturalIcon,
  NervousIcon,
  SadIcon,
  TerribleIcon,
  TiredIcon,
} from '../Shared';

type MoodIconWrapperProps = {
  mood: MoodFeedback;
  subtitle?: string;
  iconStyle?: ViewStyle;
  isSelected?: boolean;
};

export const getComfortableLevelIconComponent = (
  comfortableLevel: EventComfortableLevel,
  iconStyle?: ViewStyle
) => {
  const mood = comfortableLevel as string as MoodFeedback;
  return getMoodIconComponent(mood, iconStyle);
};

export const getMoodIconComponent = (
  mood: MoodFeedback,
  iconStyle?: ViewStyle
) => {
  switch (mood) {
    case MoodFeedback.TERRIBLE:
      return <TerribleIcon iconStyle={iconStyle} />;
    case MoodFeedback.CONFIDENT:
      return <ConfidentIcon iconStyle={iconStyle} />;
    case MoodFeedback.TIRED:
      return <TiredIcon iconStyle={iconStyle} />;
    case MoodFeedback.SAD:
      return <SadIcon iconStyle={iconStyle} />;
    case MoodFeedback.NATURAL:
      return <NaturalIcon iconStyle={iconStyle} />;
    case MoodFeedback.AGGRESSIVE:
      return <AggressiveIcon iconStyle={iconStyle} />;
    case MoodFeedback.NERVOUS:
      return <NervousIcon iconStyle={iconStyle} />;
    case MoodFeedback.HAPPY:
    default:
      return <HappyIcon iconStyle={iconStyle} />;
  }
};

export const MoodIconWrapper = ({
  mood,
  subtitle,
  iconStyle,
  isSelected,
}: MoodIconWrapperProps) => {
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        {getMoodIconComponent(mood, iconStyle)}
        {isSelected && (
          <ActiveEmojiCheckIcon
            iconStyle={{
              marginLeft: -16,
            }}
          />
        )}
      </View>
      {subtitle && (
        <View>
          <Text
            style={[
              FontText.body3,
              {
                fontFamily: 'Lato',
                fontSize: 12,
                fontWeight: '700',
              },
            ]}
          >
            {subtitle}
          </Text>
        </View>
      )}
    </>
  );
};
