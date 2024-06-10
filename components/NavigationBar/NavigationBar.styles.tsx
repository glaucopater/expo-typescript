import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../theme';

export const styles = StyleSheet.create({
  navigationBarContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    marginTop: 8,
    backgroundColor: ThemeColors.primary.white,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    borderRadius: 8,
    paddingTop: 16,
  },
  plusButton: {
    width: 60,
    height: 60,
    marginTop: -30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 1000,
    justifySelf: 'flex-end',
    marginBottom: -30,
    zIndex: 10,
  },
  plusButtonText: {
    color: 'white',
    fontSize: 50,
    lineHeight: 55,
  },
});
