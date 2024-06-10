import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    gap: 7,
    borderRadius: 8,
  },
  yearTag: {
    display: 'flex',
    flexDirection: 'row',
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingLeft: '8px',
    paddingRight: '4px',
    borderRadius: 8,
    backgroundColor: ThemeColors.primary.darkPurple,
  },
  yearTagText: {
    color: ThemeColors.primary.white,
    textAlign: 'right',

    /* Body 2 */
    fontSize: 14,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },
  monthTagContainer: {
    overflow: 'hidden',
  },
  monthTag: {
    display: 'flex',
    height: 28,
    paddingVertical: '4px',
    paddingHorizontal: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: ThemeColors.primary.white,
    marginHorizontal: 4,
  },
  monthTagSelected: {
    backgroundColor: ThemeColors.secondary.lilac,
  },

  monthTagText: {
    color: ThemeColors.primary.darkPurple,
    textAlign: 'right',
    /* Link */
    fontSize: 14,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  monthTagTextSelected: {
    color: ThemeColors.primary.octopus,
  },
});
