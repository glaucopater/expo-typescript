import { useState } from 'react';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Drink } from '../../api/models';
import { ThemeColors } from '../../theme';

export const DrinkAlcoholPercentageField = (
  {
    drinkAlcoholPercentage,
    onChange,
  }: {
    drinkAlcoholPercentage?: number;
    onChange: (val: number) => void;
  }
) => {
  const [currentDrinkAlcoholPercentage, setCurrentDrinkAlcoholPercentage] =
    useState<Drink['alcoholPercentage']>(drinkAlcoholPercentage || 0);

  const handleOnChangeQuantity = (e: string) => {
    const convertedValue = Number(e) / 100;
    setCurrentDrinkAlcoholPercentage(convertedValue);
    onChange(convertedValue);
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
        <Text style={[styles.smallText, { fontSize: 20 }]}>
          Alc. Percentage
        </Text>
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
          value={(currentDrinkAlcoholPercentage * 100).toFixed().toString()}
          onChangeText={handleOnChangeQuantity}
        />
        <Text> %</Text>
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
