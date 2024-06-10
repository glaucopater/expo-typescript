import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { ThemeColors } from '../../theme';
import { adjustTimeDisplay } from '../../utils';

type NumericCounterProps = {
  currentValue?: number | string;
  setCurrentValue: (value: number) => void;
  isReadonly?: boolean;
  isMinuteFormat?: boolean;
  isHourFormat?: boolean;
};

export const NumericCounter = ({
  currentValue,
  setCurrentValue,
  isReadonly,
  isMinuteFormat,
  isHourFormat,
}: NumericCounterProps) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <View
      style={{
        width: 80,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        flexShrink: 0,
        borderColor: ThemeColors.primary.octopus,
        borderWidth: 2,
        borderRadius: 8,
      }}
    >
      <TextInput
        editable={!isReadonly}
        placeholder="00"
        placeholderTextColor={ThemeColors.primary.white}
        keyboardType="numeric"
        value={
          !hasFocus
            ? adjustTimeDisplay(currentValue, isMinuteFormat, isHourFormat) ??
              ''
            : String(currentValue) ?? ''
        }
        maxLength={2}
        onFocus={() => {
          if (!isReadonly) setHasFocus(true);
        }}
        onBlur={() => setHasFocus(false)}
        onChangeText={(data) => {
          setCurrentValue(
            Number(adjustTimeDisplay(data, isMinuteFormat, isHourFormat))
          );
        }}
        underlineColorAndroid="transparent"
        style={{
          color: ThemeColors.primary.white,
          fontFamily: 'Lato',
          fontSize: 48,
          fontWeight: '900',
          width: 80,
          textAlign: 'center',
        }}
      />
    </View>
  );
};
