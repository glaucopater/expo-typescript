import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 400,
  },
  text: {
    color: ThemeColors.primary.white,
    width: 60,
    marginTop: 16,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Suez-One',
  },
  mediumText: {
    fontSize: 18,
    color: ThemeColors.primary.darkPurple,
    fontFamily: 'Suez-One',
  },
  isEditable: {
    backgroundColor: ThemeColors.primary.white,
  },
  smallText: {
    fontFamily: 'Suez-One',
    fontSize: 16,
  },
  saveButton: {
    height: 56,
    backgroundColor: ThemeColors.primary.darkPurple,
    color: ThemeColors.primary.darkPurple,
    width: '100%',
  },
  notesContainer: {
    padding: 0,
  },
  disabled: {
    backgroundColor: ThemeColors.primary.disabled,
  },
});
