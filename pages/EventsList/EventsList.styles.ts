import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 400,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 100,
    marginVertical: 8,
    paddingHorizontal: 20,
  },
});
