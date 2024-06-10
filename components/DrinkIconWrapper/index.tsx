import { Text, View, ViewStyle } from 'react-native';

import { DrinkType, MoodFeedback } from '../../api/models';
import { FontText } from '../../theme';
import {
  BeerIcon,
  BottleIcon,
  CanIcon,
  CocktailIcon,
  LongDrinkIcon,
  ShortDrinkIcon,
  ShotIcon,
  WineIcon,
} from '../Shared';

type DrinkIconWrapperProps = {
  drinkType: DrinkType;
  subtitle?: string;
  iconStyle?: ViewStyle;
  isSelected?: boolean;
};

export const getDrinkIconComponent = (
  drinkType: DrinkType,
  iconStyle?: ViewStyle
) => {
  switch (drinkType) {
    case DrinkType.WINE:
      return <WineIcon iconStyle={iconStyle} />;
    case DrinkType.BEER:
      return <BeerIcon iconStyle={iconStyle} />;
    case DrinkType.BOTTLE:
      return <BottleIcon iconStyle={iconStyle} />;
    case DrinkType.CAN:
      return <CanIcon iconStyle={iconStyle} />;
    case DrinkType.LONG_DRINK:
      return <LongDrinkIcon iconStyle={iconStyle} />;
    case DrinkType.SHORT_DRINK:
      return <ShortDrinkIcon iconStyle={iconStyle} />;
    case DrinkType.SHOT:
      return <ShotIcon iconStyle={iconStyle} />;
    case DrinkType.COCKTAIL:
    default:
      return <CocktailIcon iconStyle={iconStyle} />;
  }
};

export const DrinkIconWrapper = ({
  drinkType,
  subtitle,
  iconStyle,
  isSelected,
}: DrinkIconWrapperProps) => {
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        {getDrinkIconComponent(drinkType, iconStyle)}
      </View>
      {subtitle && (
        <View>
          <Text
            style={[
              FontText.body3,
              {
                fontFamily: 'Lato',
                fontSize: 12,
                fontWeight: '700',
              },
            ]}
          >
            {subtitle}
          </Text>
        </View>
      )}
    </>
  );
};
