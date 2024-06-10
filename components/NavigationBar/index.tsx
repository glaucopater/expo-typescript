import React, { useState } from 'react';
import { ImageBackground, Pressable, View } from 'react-native';

import { NavigationMenuItemType } from '../../api/models';
import { ThemeColors } from '../../theme';
import { FadeInView } from '../FadeInView';
import { NavigationMenu } from '../NavigationMenu';
import { NavigationMenuItem } from '../NavigationMenuItem';
import { styles } from './NavigationBar.styles';

const NavigationBar = ({
  navigation,
  isReminderEnabled,
}: {
  navigation?: any;
  isReminderEnabled: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleOnClick = () => {
    setIsActive((prevStatus) => !prevStatus);
  };

  const handleOnAddPastEvent = () => {
    navigation.navigate('Event');
    setIsActive((prev) => !prev);
  };

  const handleOnAddReminder = () => {
    navigation.navigate('Reminder');
    setIsActive((prev) => !prev);
  };

  return (
    <View style={styles.navigationBarContainer}>
      <View style={styles.container}>
        {isActive && (
          <FadeInView
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: '100%',
              backgroundColor: ThemeColors.primary.white,
              marginBottom: 16,
              borderRadius: 8,
            }}
          >
            <NavigationMenuItem
              testID="create-reminder-menu-item"
              isReminderEnabled={isReminderEnabled}
              onPress={handleOnAddReminder}
              itemType={NavigationMenuItemType.TIMER}
              title={'Create Reminder'}
              content={
                'Evaluate your drink purpose, set Alcohol level, Reminder and set time to go home'
              }
            />
            <NavigationMenuItem
              testID="add-drink-record-menu-item"
              onPress={handleOnAddPastEvent}
              itemType={NavigationMenuItemType.GLASS}
              title={'Add Drink Record'}
              content={
                'Add Record of your alcohol consumption, mood, money spent and more'
              }
            />
          </FadeInView>
        )}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            alignContent: 'space-around',
            width: '100%',
            borderRadius: isActive ? 8 : 0,
          }}
        >
          <Pressable
            onPress={handleOnClick}
            style={styles.plusButton}
            testID="navigation-menu"
          >
            <ImageBackground
              source={require('../../assets/images/plusButton.png')}
              style={{
                width: 60,
                height: 60,
                marginTop: -10,
                transform: [{ rotate: isActive ? '45 deg' : '0 deg' }],
              }}
            />
          </Pressable>
          <NavigationMenu navigation={navigation} isHidden={isActive} />
        </View>
      </View>
    </View>
  );
};

export default NavigationBar;
