import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 8,
    marginBottom: 4,
    borderWidth: 1,
    backgroundColor: ThemeColors.primary.octopus,
  },
  disabled: {
    backgroundColor: ThemeColors.primary.disabled,
  },
  invisible: {
    opacity: 0,
  },
  text: {
    color: ThemeColors.primary.white,
    fontFamily: 'Suez-One',
    fontSize: 12,
  },
});
