import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DrinkType } from '../../api/models';
import { FontText, ThemeColors } from '../../theme';
import { DrinkIconWrapper } from '../DrinkIconWrapper';

export const DrinkTypeSelector = ({
  drinkType,
  onChange,
}: {
  drinkType?: DrinkType;
  onChange: any;
}) => {
  const [currentDrinkType, setCurrentDrinkType] = useState<DrinkType>(
    drinkType || DrinkType.COCKTAIL
  );

  const handleOnChangeDrinkType = (_e: any, drinkType: DrinkType) => {
    setCurrentDrinkType(drinkType);
    onChange(drinkType);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          FontText.body1,
          {
            fontSize: 20,
            alignSelf: 'flex-start',
          },
        ]}
      >
        {'Choose drink type'}
      </Text>
      <ScrollView style={styles.buttonContainer} horizontal>
        {[
          DrinkType.WINE,
          DrinkType.BEER,
          DrinkType.BOTTLE,
          DrinkType.COCKTAIL,
          DrinkType.LONG_DRINK,
          DrinkType.SHORT_DRINK,
          DrinkType.CAN,
          DrinkType.SHOT,
        ].map((drinkType, index) => {
          return (
            <Pressable
              key={index}
              onPress={(e) => handleOnChangeDrinkType(e, drinkType)}
              style={[
                styles.pressableStyle,
                {
                  opacity: currentDrinkType === drinkType ? 1 : 0.2,
                },
              ]}
            >
              <DrinkIconWrapper
                drinkType={drinkType}
                isSelected={currentDrinkType === drinkType}
                iconStyle={{
                  width: 68,
                  height: 68,
                  borderWidth: currentDrinkType === drinkType ? 1 : 0,
                  borderColor: ThemeColors.primary.octopus,
                  borderRadius: 8,
                }}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    width: '90%',
    paddingVertical: 8,
  },
  emojiButtonView: {
    backgroundColor: 'white',
    borderColor: ThemeColors.primary.octopus,
    width: 80,
  },
  emojiButtonText: {
    color: ThemeColors.primary.octopus,
    fontSize: 12,
  },
  pressableStyle: {
    width: 64,
    height: 84,
    opacity: 0.2,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
