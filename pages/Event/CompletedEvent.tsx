import React from 'react';
import { TextInput, View } from 'react-native';

import { EmojiFeedback } from '../../components/EmojiFeedback';
import { HangoverFeedbackContainer } from '../../components/HangoverFeedback';
import { ThemeColors } from '../../theme';
import { styles } from './Event.styles';

export const CompletedEvent = ({
  eventMood,
  setEventMood,
  eventHangoverFeedback,
  setEventHangoverFeedback,
  eventNotes,
  setEventNotes,
}) => {
  return (
    <>
      <EmojiFeedback mood={eventMood} onChange={setEventMood} />
      <HangoverFeedbackContainer
        hangoverFeedback={eventHangoverFeedback}
        onChange={setEventHangoverFeedback}
      />
      <View style={styles.notesContainer}>
        <TextInput
          multiline
          style={{
            height: 100,
            marginVertical: 8,
            padding: 16,
            borderColor: ThemeColors.primary.octopus,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: ThemeColors.primary.white,
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            display: 'flex',
            textAlignVertical: 'top',
          }}
          placeholder="Add a note"
          value={eventNotes ?? ''}
          onChangeText={(data) => setEventNotes(data)}
          underlineColorAndroid="transparent"
        />
      </View>
    </>
  );
};
