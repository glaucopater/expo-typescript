import { TextInput, TextStyle, View, ViewStyle } from 'react-native';

import { ThemeColors } from '../../theme';
import { CounterButton } from '../CounterButton';
import { styles } from './CounterContainer.styles';

type CounterContainerProps = {
  numberOfGlasses: number;
  handleOnDecreaseCounter: () => void;
  setNumberOfGlasses: React.Dispatch<React.SetStateAction<number>>;
  handleOnIncreaseCounter: () => void;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  readonly?: boolean;
};

export const CounterContainer = (
  {
    numberOfGlasses,
    handleOnDecreaseCounter,
    setNumberOfGlasses,
    handleOnIncreaseCounter,
    viewStyle,
    textStyle,
    readonly,
  }: CounterContainerProps
) => {
  return (
    <View style={[styles.counterContainer, viewStyle]}>
      <CounterButton
        label="-"
        isDisabled={numberOfGlasses === 0}
        onClickEvent={handleOnDecreaseCounter}
        readonly={readonly}
      />
      <TextInput
        style={[styles.text, textStyle]}
        placeholderTextColor={ThemeColors.primary.anotherPurple}
        keyboardType="numeric"
        value={String(numberOfGlasses)}
        maxLength={2}
        onChangeText={(data) => {
          setNumberOfGlasses(Number(data));
        }}
        underlineColorAndroid="transparent"
      />
      <CounterButton
        label="+"
        onClickEvent={handleOnIncreaseCounter}
        readonly={readonly}
      />
    </View>
  );
};
