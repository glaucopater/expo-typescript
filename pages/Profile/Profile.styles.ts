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
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  title: {
    fontFamily: 'Suez-One',
    fontSize: 20,
    height: 26,
    color: ThemeColors.primary.darkPurple,
  },
});

// Profile.styles.js
// Profile.styles.js

export const stylesExtended = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: ThemeColors.primary.darkPurple,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 36,
    fontFamily: 'Lato',
    width: '100%',
  },
  label: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: ThemeColors.primary.textGray,
  },
  value: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 26,
    color: ThemeColors.primary.darkPurple,
  },
};
