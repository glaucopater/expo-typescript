import React, { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Drink, DrinkType } from '../../api/models';
import { ScrollViewWrapperTemplate } from '../../templates/ScrollViewWrapperTemplate';
import { FontText, ThemeColors } from '../../theme';
import { generateRandomDrinks } from '../../utils';
import { Breaker } from '../Breaker';
import { CounterContainer } from '../CounterContainer';
import { DrinkAlcoholPercentageField } from '../DrinkAlcoholPercentageField';
import { DrinkQuantityField } from '../DrinkQuantityField';
import { DrinkTypeSelector } from '../DrinkTypeSelector';
import { GenericButton } from '../GenericButton';

type EditDrinkProps = {
  onSaveNewDrink: any;
  onRemove: any;
  activeDrink: Drink;
  onUpdateDrink: any;
};

export const EditDrink = ({
  onSaveNewDrink,
  onRemove,
  activeDrink,
  onUpdateDrink,
}: EditDrinkProps) => {
  const [currentDrink, setCurrentDrink] = useState<Drink>(
    activeDrink || generateRandomDrinks(1)[0]
  );
  const [drinkNameEditable, setDrinkNameEditable] = useState(false);
  const [currentNumberOfGlasses, setCurrentNumberOfGlasses] = useState(
    activeDrink?.numberOfGlasses || 0
  );

  // upsert logic
  const handleOnSave = () => {
    if (activeDrink) {
      onUpdateDrink(currentDrink);
    } else {
      onSaveNewDrink(currentDrink);
    }
  };

  const handleOnRemove = () => {
    onRemove(currentDrink);
  };

  const handleOnEditdrinkName = () => {
    setDrinkNameEditable((prevState) => !prevState);
  };

  const handleOnChangeDrinkType = (drinkType: Drink['type']) => {
    setCurrentDrink({ ...currentDrink, type: drinkType });
  };

  const handleOnChangeDrinkQuantity = (drinkQuantity: Drink['quantity']) => {
    setCurrentDrink({ ...currentDrink, quantity: drinkQuantity });
  };

  const handleOnChangeDrinkAlcoholPercentage = (
    drinkAlcoholPercentage: Drink['alcoholPercentage']
  ) => {
    setCurrentDrink({
      ...currentDrink,
      alcoholPercentage: drinkAlcoholPercentage,
    });
  };

  const handleOnDecreaseCounter = () => {
    setCurrentNumberOfGlasses(currentNumberOfGlasses - 1);

    setCurrentDrink({
      ...currentDrink,
      numberOfGlasses: currentNumberOfGlasses - 1,
    });
  };

  const handleOnIncreaseCounter = () => {
    setCurrentNumberOfGlasses(currentNumberOfGlasses + 1);
    setCurrentDrink({
      ...currentDrink,
      numberOfGlasses: currentNumberOfGlasses + 1,
    });
  };

  return (
    <ScrollViewWrapperTemplate
      forceAppReadyness
      rootStyle={styles.root}
      scrollViewStyle={{
        overflow: 'hidden',
      }}
      testID="drink-page"
    >
      <View
        style={{
          width: '100%',
          padding: 18,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-around',
          }}
        >
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
            {'Drink name'}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'space-between',
              justifyContent: 'space-between',
            }}
          >
            {drinkNameEditable ? (
              <TextInput
                onBlur={() => setDrinkNameEditable(false)}
                onChangeText={(data) =>
                  setCurrentDrink({
                    ...currentDrink,
                    name: data,
                  })
                }
                style={[styles.mediumText, { width: '100%' }]}
                placeholderTextColor={ThemeColors.primary.white}
                value={currentDrink.name}
                underlineColorAndroid="transparent"
              />
            ) : (
              <Pressable
                onPress={handleOnEditdrinkName}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'space-between',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text style={styles.mediumText}>{currentDrink.name}</Text>
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
        </View>
        <Breaker isActive={drinkNameEditable} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 16,
          }}
        >
          <Text
            style={[
              FontText.body1,
              {
                fontSize: 20,
                alignSelf: 'flex-start',
              },
            ]}
          >
            {'How many glasses?'}
          </Text>
          <CounterContainer
            numberOfGlasses={currentNumberOfGlasses}
            handleOnDecreaseCounter={handleOnDecreaseCounter}
            setNumberOfGlasses={setCurrentNumberOfGlasses}
            handleOnIncreaseCounter={handleOnIncreaseCounter}
            viewStyle={{}}
            textStyle={{
              color: ThemeColors.primary.darkPurple,
              fontSize: 16,
              width: 40,
            }}
          />
        </View>

        <DrinkTypeSelector
          drinkType={currentDrink.type}
          onChange={handleOnChangeDrinkType}
        />
        <DrinkQuantityField
          drinkQuantity={currentDrink.quantity}
          onChange={handleOnChangeDrinkQuantity}
        />
        <DrinkAlcoholPercentageField
          drinkAlcoholPercentage={currentDrink.alcoholPercentage}
          onChange={handleOnChangeDrinkAlcoholPercentage}
        />
        <GenericButton
          testID="save-drink"
          label="Save"
          onClickEvent={handleOnSave}
          viewStyle={[
            styles.saveButton,
            currentNumberOfGlasses === 0 ? styles.disabled : {},
          ]}
          isDisabled={currentNumberOfGlasses === 0}
        />
        {currentDrink.name && (
          <GenericButton
            testID="remove-drink"
            label="Remove drink"
            onClickEvent={handleOnRemove}
            viewStyle={{
              backgroundColor: 'transparent',
              width: '100%',
              borderWidth: 0,
              height: 56,
            }}
            textStyle={{
              color: ThemeColors.primary.octopus,
            }}
          />
        )}
      </View>
    </ScrollViewWrapperTemplate>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 400,
  },
  text: {
    color: ThemeColors.primary.white,
    width: 60,
    marginTop: 16,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Suez-One',
  },
  mediumText: {
    fontSize: 18,
    color: ThemeColors.primary.darkPurple,
    fontFamily: 'Suez-One',
  },
  isEditable: {
    backgroundColor: ThemeColors.primary.white,
  },
  smallText: {
    fontFamily: 'Suez-One',
    fontSize: 16,
  },
  saveButton: {
    height: 56,
    backgroundColor: ThemeColors.primary.darkPurple,
    color: ThemeColors.primary.darkPurple,
    width: '100%',
  },
  notesContainer: {
    padding: 0,
  },
  disabled: {
    backgroundColor: ThemeColors.primary.disabled,
  },
});
