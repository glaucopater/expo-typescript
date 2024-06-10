import { ImageBackground, Pressable } from 'react-native';
import { Text, View } from 'react-native';

import { Drink } from '../../api/models';
import { ThemeColors } from '../../theme';
import { getDrinkIconComponent } from '../DrinkIconWrapper';

export const DrinkCard = ({
  drink,
  navigation,
  editDrink,
}: {
  drink: Drink;
  navigation?: any;
  editDrink?: any;
}) => {
  return (
    <Pressable
      style={{
        marginVertical: 4,
      }}
      onPress={() => {
        editDrink(drink);
      }}
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: ThemeColors.primary.white,
          borderRadius: 8,
          padding: 16,
          height: 68,
        }}
      >
        {getDrinkIconComponent(drink.type, { width: 52, height: 52 })}
        <View
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexShrink: 1,
            alignSelf: 'auto',
            marginHorizontal: 16,
            height: '100%',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text
                style={{
                  color: ThemeColors.primary.octopus,
                  textAlign: 'left',
                  fontFamily: 'Lato',
                  fontSize: 16,
                  fontWeight: '900',
                }}
              >
                {drink.numberOfGlasses ? 'x' + drink.numberOfGlasses : '?'}
              </Text>
              <Text
                style={{
                  color: ThemeColors.primary.darkPurple,
                  width: '100%',
                  height: 'auto',
                  textAlign: 'left',
                  alignSelf: 'auto',
                  fontFamily: 'Lato',
                  fontSize: 16,
                  fontWeight: '900',
                  paddingHorizontal: 4,
                }}
              >
                {drink.name}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: 24,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginRight: 0,
                flexShrink: 1,
                alignSelf: 'auto',
              }}
            >
              <View
                style={{
                  backgroundColor: 'transparent',
                  height: 24,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  padding: 0,
                  flexShrink: 1,
                  alignSelf: 'auto',
                }}
              >
                <View
                  style={{
                    height: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 8,
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: 'rgba(27, 20, 39, 0.6)',
                        height: 'auto',
                        textAlign: 'left',
                        alignSelf: 'auto',
                        fontFamily: 'Lato',
                        fontSize: 12,
                        fontWeight: '900',
                      }}
                    >
                      Alc. {drink.alcoholPercentage}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ImageBackground
          style={{
            width: 8,
            height: 12,
          }}
          source={require('../../assets/images/chevronRight.png')}
        />
      </View>
    </Pressable>
  );
};
