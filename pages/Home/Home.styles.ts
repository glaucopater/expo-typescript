import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    paddingBottom: 32,
  },
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: 100,
    backgroundColor: '#fafafa',
    flexDirection: 'column',
    alignContent: 'center',
    paddingTop: 32,
  },
  text: {
    color: ThemeColors.primary.white,
    marginTop: 16,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Suez-One',
    fontSize: 20,
    width: 223,
    height: 26,
    color: ThemeColors.primary.darkPurple,
  },
});
