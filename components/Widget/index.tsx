import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { ThemeColors } from '../../theme';

const Widget = ({
  title,
  content,
  viewStyle,
}: {
  title: string;
  content: string;
  viewStyle?: ViewStyle;
}) => {
  return (
    <View style={[styles.container, viewStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: ThemeColors.primary.white,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    flexBasis: '49%',
    shadowColor: ThemeColors.primary.darkPurple,
  },
  title: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 4,
    width: 120,
    textAlign: 'center',
  },
  content: {
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    width: 380,
    textAlign: 'center',
    wordWrap: 'wrap',
  },
});

export default Widget;
