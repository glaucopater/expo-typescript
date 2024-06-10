import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ThemeColors } from '../../theme';

export type EditEventNameWrapperProps = {
  setEventNameEditable: (value: boolean) => void;
  setEventName: any;
  eventName: string;
  eventNameEditable: boolean;
  handleOnEditEventName: any;
};

export const EditEventNameWrapper = ({
  setEventNameEditable,
  setEventName,
  eventName,
  eventNameEditable,
  handleOnEditEventName,
}: EditEventNameWrapperProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
      }}
      testID="event-name"
    >
      {eventNameEditable ? (
        <TextInput
          onBlur={() => setEventNameEditable(false)}
          onChangeText={(data) => setEventName(data)}
          style={[styles.mediumText, { width: '100%' }]}
          placeholderTextColor={ThemeColors.primary.white}
          value={eventName}
          underlineColorAndroid="transparent"
        />
      ) : (
        <Pressable
          onPress={handleOnEditEventName}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'space-between',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text style={styles.mediumText}>{eventName}</Text>
          <ImageBackground
            style={{
              width: 24,
              height: 24,
            }}
            source={require('../../assets/images/edit.png')}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mediumText: {
    fontSize: 20,
    color: ThemeColors.primary.darkPurple,
    fontFamily: 'Suez-One',
  },
});
