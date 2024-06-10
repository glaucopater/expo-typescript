import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Tags } from '../../api/models';
import { ThemeColors } from '../../theme';

export const StatusBadge = ({
  status,
  label,
}: {
  status: Tags;
  label: string;
}) => {
  return (
    <View
      style={[
        {
          backgroundColor:
            status === Tags.GOOD ? ThemeColors.tags.good : ThemeColors.tags.bad,
        },
        styles.container,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 66,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  text: {
    display: 'flex',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Lato',
    height: 24,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});
