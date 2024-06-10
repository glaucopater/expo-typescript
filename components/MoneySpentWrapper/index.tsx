import { StyleSheet, Text, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import { DEFAULT_CURRENCY } from '../../config';
import { ThemeColors } from '../../theme';

export type MoneySpentWrapperProps = {
  eventAmount: number;
  setEventAmount: any;
};

export const MoneySpentWrapper = ({
  eventAmount,
  setEventAmount,
}: MoneySpentWrapperProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text style={styles.smallText}>Money spent?</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CurrencyInput
          style={{
            width: 80,
            borderColor: ThemeColors.primary.octopus,
            backgroundColor: ThemeColors.primary.white,
            borderWidth: 2,
            borderRadius: 8,
            height: 36,
            padding: 8,
            marginVertical: 8,
            fontWeight: '900',
          }}
          value={eventAmount}
          onChangeValue={setEventAmount}
          prefix={DEFAULT_CURRENCY}
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'Suez-One',
    fontSize: 20,
  },
});
