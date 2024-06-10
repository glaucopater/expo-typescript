import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BoozyBFEvent, HangoverFeedback } from '../../api/models';
import { FontText, ThemeColors } from '../../theme';
import { GenericButton } from '../GenericButton';

export const HangoverFeedbackContainer = ({
  hangoverFeedback,
  onChange,
}: {
  hangoverFeedback?: BoozyBFEvent['hangoverFeedback'];
  onChange?: any;
}) => {
  const [currentHangoverFeedback, setHangoverFeedback] = useState<
    BoozyBFEvent['hangoverFeedback']
  >(hangoverFeedback || HangoverFeedback.FRESH);

  const handleOnChangeHangoverFeedback = (
    _e: any,
    hangoverFeedback: BoozyBFEvent['hangoverFeedback']
  ) => {
    setHangoverFeedback(hangoverFeedback);
    onChange(hangoverFeedback);
  };

  return (
    <View style={styles.container}>
      <Text style={[FontText.body1, { fontSize: 20 }]}>{'Morning After'}</Text>
      <View style={styles.buttonContainer}>
        {Object.values(HangoverFeedback).map((feedback, index) => (
          <GenericButton
            key={index}
            label={feedback}
            isSelected={currentHangoverFeedback === feedback}
            viewStyle={[
              styles.hangoverButtonView,
              {
                backgroundColor:
                  currentHangoverFeedback === feedback
                    ? ThemeColors.primary.darkPurple
                    : ThemeColors.primary.white,
              },
            ]}
            textStyle={[
              styles.hangoverButtonText,
              {
                color:
                  currentHangoverFeedback === feedback
                    ? ThemeColors.primary.white
                    : ThemeColors.primary.octopus,
              },
            ]}
            onClickEvent={(e) => handleOnChangeHangoverFeedback(e, feedback)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
  },
  hangoverButtonView: {
    borderColor: ThemeColors.primary.octopus,
    maxWidth: 112,
  },
  hangoverButtonText: {
    color: ThemeColors.primary.octopus,
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
});
