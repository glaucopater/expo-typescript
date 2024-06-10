import { useRoute } from '@react-navigation/native';
import { ImageBackground, Pressable, Text, View } from 'react-native';

import { ThemeColors } from '../../theme';

type NavigationMenuProps = {
  navigation: any;
  isHidden?: boolean;
};

export const NavigationMenu = ({
  navigation,
  isHidden,
}: NavigationMenuProps) => {
  const { name: currentRouteName } = useRoute();

  return (
    <View
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'space-between',
        backgroundColor: 'white',
        height: 80,
        opacity: isHidden ? 0 : 1,
        borderRadius: 8,
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: ThemeColors.primary.white,
        }}
      >
        <ImageBackground
          source={require('../../assets/images/home-active.png')}
          style={{
            width: 24,
            height: 24,
            opacity: currentRouteName === 'Home' ? 1 : 0.2,
          }}
        ></ImageBackground>
        <Text
          style={{
            color: ThemeColors.primary.darkPurple,
            fontWeight: currentRouteName === 'Home' ? '500' : 'normal',
          }}
        >
          Home
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('EventsList');
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ImageBackground
          source={require('../../assets/images/record-active.png')}
          style={{
            width: 24,
            height: 24,
            opacity: currentRouteName === 'EventsList' ? 1 : 0.2,
          }}
        ></ImageBackground>
        <Text
          style={{
            color: ThemeColors.primary.darkPurple,
            fontWeight: currentRouteName === 'EventsList' ? '500' : 'normal',
          }}
        >
          Record
        </Text>
      </Pressable>
    </View>
  );
};
