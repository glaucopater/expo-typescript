import { Text, View } from 'react-native';

import { EventPurpose } from '../../api/models';
import { ThemeColors } from '../../theme';

export const EventPurposeWrapper = ({
  eventPurpose,
}: {
  eventPurpose: EventPurpose;
}) => {
  return (
    <View
      style={{
        backgroundColor: ThemeColors.primary.disabledGrey,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        width: 80,
        marginVertical: 16,
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
        {eventPurpose}
      </Text>
    </View>
  );
};
