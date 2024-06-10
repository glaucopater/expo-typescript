import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Drink } from '../../api/models';
import { DEFAULT_UNIT_OF_MEASUREMENT } from '../../config';
import { FontText, ThemeColors, ThemeFonts } from '../../theme';

export const DrinkQuantityField = ({
  drinkQuantity,
  drinkUnitOfMeasurement,
  onChange,
}: {
  drinkQuantity?: Drink['quantity'];
  drinkUnitOfMeasurement?: Drink['unitOfMeasurement'];
  onChange: any;
}) => {
  const [currentDrinkQuantity, setCurrentDrinkQuantity] = useState<
    Drink['quantity']
  >(drinkQuantity || 0);

  const handleOnChangeQuantity = (e: string) => {
    setCurrentDrinkQuantity(Number(e));
    onChange(Number(e));
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Text style={[styles.smallText, { fontSize: 20 }]}>Quantity</Text>
        <Text
          style={[
            styles.smallText,
            {
              color: ThemeColors.primary.fadedDarlPurple,
              fontSize: 12,
              marginVertical: 8,
            },
          ]}
        >
          Here some estimation for you or add your own
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextInput
          style={{
            width: 60,
            borderColor: ThemeColors.primary.octopus,
            backgroundColor: ThemeColors.primary.white,
            borderWidth: 1,
            borderRadius: 8,
            height: 36,
            padding: 8,
            margin: 8,
          }}
          value={currentDrinkQuantity.toString()}
          onChangeText={handleOnChangeQuantity}
        />
        <Text>{drinkUnitOfMeasurement || DEFAULT_UNIT_OF_MEASUREMENT}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 400,
  },

  smallText: {
    fontFamily: 'Suez-One',
    fontSize: 16,
  },
});
