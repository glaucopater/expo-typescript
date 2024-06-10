import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    color: ThemeColors.primary.white,
    maxWidth: 400,
  },
  text: {
    color: ThemeColors.primary.white,
    marginTop: 16,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  mediumText: {
    fontSize: 18,
    color: ThemeColors.primary.darkPurple,
  },
  smallText: {
    fontSize: 16,
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  isEditable: {
    borderWidth: 1,
    borderColor: ThemeColors.primary.white,
    width: 200,
  },
});
