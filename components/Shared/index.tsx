import React from 'react';
import { ImageBackground, Platform, StyleSheet, ViewStyle } from 'react-native';

import { ThemeColors } from '../../theme';

export const HappyIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="happy-icon"
    source={require(`../../assets/images/moods/happy.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const ConfidentIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="confident-icon"
    source={require(`../../assets/images/moods/confident.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const TerribleIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="terrible-icon"
    source={require(`../../assets/images/moods/terrible.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const TiredIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="tired-icon"
    source={require(`../../assets/images/moods/tired.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const SadIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="sad-icon"
    source={require(`../../assets/images/moods/sad.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const NaturalIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="natural-icon"
    source={require(`../../assets/images/moods/natural.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const AggressiveIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="aggressive-icon"
    source={require(`../../assets/images/moods/aggressive.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const NervousIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="nervous-icon"
    source={require(`../../assets/images/moods/nervous.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const TimerIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="timer-icon"
    source={require(`../../assets/images/timer.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const GlassesIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="glasses-icon"
    source={require(`../../assets/images/glassesIcon.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const ReminderActiveIcon = ({
  iconStyle,
}: {
  iconStyle?: ViewStyle;
}) => (
  <ImageBackground
    testID="reminder-active-icon"
    source={require(`../../assets/images/reminderActiveIcon.png`)}
    style={[styles.icon, { width: 48, height: 48 }, iconStyle]}
  ></ImageBackground>
);

export const ReminderIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="reminder-icon"
    source={require(`../../assets/images/reminderIcon.png`)}
    style={[styles.icon, { width: 68, height: 68 }, iconStyle]}
  ></ImageBackground>
);

export const SmallPlusIcon = () => (
  <ImageBackground
    testID="small-plus-icon"
    source={require(`../../assets/images/smallPlusIcon.png`)}
    style={[styles.icon, { width: 24, height: 24 }]}
  ></ImageBackground>
);

export const SmallMinusIcon = () => (
  <ImageBackground
    testID="small-minus-icon"
    source={require(`../../assets/images/smallMinusIcon.png`)}
    style={[styles.icon, { width: 28, height: 28 }]}
  ></ImageBackground>
);

export const SmallMinusDisabledIcon = () => (
  <ImageBackground
    testID="small-minus-disabled-icon"
    source={require(`../../assets/images/smallMinusDisabledIcon.png`)}
    style={[styles.icon, { width: 28, height: 28 }]}
  ></ImageBackground>
);

export const ActiveEmojiCheckIcon = ({
  iconStyle,
}: {
  iconStyle?: ViewStyle;
}) => (
  <ImageBackground
    testID="active-emoji-check-icon"
    source={require(`../../assets/images/activeEmojiCheck.png`)}
    style={[styles.icon, { width: 16, height: 16 }, iconStyle]}
  ></ImageBackground>
);

export const OnboardingIcon = () => (
  <ImageBackground
    testID="onboarding-icon"
    source={require(`../../assets/images/onboardingIcon.png`)}
    style={[styles.icon, { width: 28, height: 28 }]}
  ></ImageBackground>
);

export const ProgressBar0 = () => (
  <ImageBackground
    style={styles.progressBarImage}
    source={require('../../assets/images/progressBar0.png')}
    resizeMode={'contain'}
  ></ImageBackground>
);

export const ProgressBar25 = () => (
  <ImageBackground
    style={styles.progressBarImage}
    source={require('../../assets/images/progressBar25.png')}
    resizeMode={'contain'}
  ></ImageBackground>
);

export const ProgressBar50 = () => (
  <ImageBackground
    style={styles.progressBarImage}
    source={require('../../assets/images/progressBar50.png')}
    resizeMode={'contain'}
  ></ImageBackground>
);

export const ProgressBar75 = () => (
  <ImageBackground
    style={styles.progressBarImage}
    source={require('../../assets/images/progressBar75.png')}
    resizeMode={'contain'}
  ></ImageBackground>
);

export const ProgressBar100 = () => (
  <ImageBackground
    style={styles.progressBarImage}
    source={require('../../assets/images/progressBar100.png')}
    resizeMode={'contain'}
  ></ImageBackground>
);

export const WineIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="wine-icon"
    source={require(`../../assets/images/drinks/wine.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const BeerIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="beer-icon"
    source={require(`../../assets/images/drinks/beer.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const BottleIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="bottle-icon"
    source={require(`../../assets/images/drinks/smallBottle.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const CocktailIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="cocktail-icon"
    source={require(`../../assets/images/drinks/cocktail.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const CanIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="can-icon"
    source={require(`../../assets/images/drinks/can.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const ShortDrinkIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="short-drink-icon"
    source={require(`../../assets/images/drinks/shortDrink.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const LongDrinkIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="long-drink-icon"
    source={require(`../../assets/images/drinks/longDrink.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const ShotIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="shot-icon"
    source={require(`../../assets/images/drinks/shot.png`)}
    style={[styles.icon, iconStyle]}
  ></ImageBackground>
);

export const UserIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="user-icon"
    source={require(`../../assets/images/user.png`)}
    style={[styles.icon, { width: 100, height: 100 }, iconStyle]}
  ></ImageBackground>
);

export const AppIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="app-icon"
    source={require(`../../assets/images/favicon.png`)}
    style={[styles.icon, { width: 40, height: 40 }, iconStyle]}
  ></ImageBackground>
);

export const BackArrowIcon = ({ iconStyle }: { iconStyle?: ViewStyle }) => (
  <ImageBackground
    testID="backarrow-icon"
    source={require(`../../assets/images/backarrow.png`)}
    style={[styles.icon, { width: 40, height: 40 }, iconStyle]}
  ></ImageBackground>
);

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
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: 100,
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
  progressBarImage: {
    height: 110,
    marginTop: Platform.OS === 'android' ? -82 : -83,
    marginBottom: -40,
  },
});
