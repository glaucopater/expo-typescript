import { useRoute } from '@react-navigation/native';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NavigationMenuItemType } from '../../api/models';
import { ThemeColors } from '../../theme';

const TimerMenuItemIcon = () => (
  <View style={styles.iconContainer}>
    <ImageBackground
      style={{
        width: 46,
        height: 46,
      }}
      source={require(`../../assets/images/timer.png`)}
    />
  </View>
);

const GlassMenuItemIcon = () => (
  <View style={styles.iconContainer}>
    <ImageBackground
      style={{
        width: 26,
        height: 51,
      }}
      source={require(`../../assets/images/glass.png`)}
    />
  </View>
);

type NavigationMenuItemProps = {
  itemType: NavigationMenuItemType;
  title: string;
  content: string;
  onPress: any;
  isReminderEnabled?: boolean;
  testID?: string;
};

export const NavigationMenuItem = ({
  itemType,
  title,
  content,
  onPress,
  isReminderEnabled,
  testID,
}: NavigationMenuItemProps) => {
  return (
    <Pressable
      testID={testID || 'navigatione-menu-item'}
      onPress={onPress}
      disabled={isReminderEnabled}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      {itemType === NavigationMenuItemType.TIMER ? (
        <TimerMenuItemIcon />
      ) : (
        <GlassMenuItemIcon />
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 240,
          margin: 8,
          opacity: isReminderEnabled ? 0.2 : 1,
        }}
      >
        <Text
          style={{
            fontFamily: 'Suez-One',
            fontSize: 20,
            color: ThemeColors.primary.darkPurple,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Lato',
            fontSize: 12,
            fontWeight: '700',
            color: ThemeColors.primary.darkPurple,
          }}
        >
          {content}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    width: 68,
    height: 68,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
});
