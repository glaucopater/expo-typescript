import React from 'react';
import { Pressable } from 'react-native';

import { ThemeColors } from '../../theme';
import {
  SmallMinusDisabledIcon,
  SmallMinusIcon,
  SmallPlusIcon,
} from '../Shared';
import { styles } from './Counter.styles';

export const CounterButton = ({
  label,
  onClickEvent,
  isDisabled,
  readonly,
}: {
  label: string;
  onClickEvent?: () => void;
  isDisabled?: boolean;
  readonly?: boolean;
}) => {
  const minusButtonIcon = isDisabled ? (
    <SmallMinusDisabledIcon />
  ) : (
    <SmallMinusIcon />
  );
  return (
    <Pressable
      onPress={onClickEvent}
      disabled={isDisabled}
      style={[
        styles.container,
        isDisabled && styles.disabled,
        readonly && styles.invisible,
      ]}
    >
      {label === '+' ? <SmallPlusIcon /> : minusButtonIcon}
    </Pressable>
  );
};
