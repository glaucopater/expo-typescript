import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 400,
  },
  text: {
    color: ThemeColors.primary.white,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato',
  },
  smallText: {
    fontFamily: 'Suez-One',
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
});
