import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BoozyBFEvent, MoodFeedback } from '../../api/models';
import { FontText, ThemeColors } from '../../theme';
import { MoodIconWrapper } from '../MoodIconWrapper';

export const EmojiFeedback = ({
  mood,
  onChange,
}: {
  mood?: BoozyBFEvent['moodStatus'];
  onChange: any;
}) => {
  const [currentMood, setCurrentMood] = useState<BoozyBFEvent['moodStatus']>(
    mood || MoodFeedback.HAPPY
  );

  const handleOnChangeMood = (_e: any, mood: BoozyBFEvent['moodStatus']) => {
    setCurrentMood(mood);
    onChange(mood);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          FontText.body1,
          {
            fontSize: 20,
            alignSelf: 'flex-start',
          },
        ]}
      >
        {'How did you feel?'}
      </Text>
      <View style={styles.buttonContainer}>
        {[
          MoodFeedback.HAPPY,
          MoodFeedback.NATURAL,
          MoodFeedback.TERRIBLE,
          MoodFeedback.SAD,
        ].map((mood, index) => {
          return (
            <Pressable
              testID={`mood-${mood}`}
              key={index}
              onPress={(e) => handleOnChangeMood(e, mood)}
              style={[
                styles.pressableStyle,
                {
                  opacity: currentMood === mood ? 1 : 0.2,
                },
              ]}
            >
              <MoodIconWrapper
                mood={mood}
                subtitle={mood}
                isSelected={currentMood === mood}
                iconStyle={{
                  width: 48,
                  height: 48,
                }}
              />
            </Pressable>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        {[
          MoodFeedback.AGGRESSIVE,
          MoodFeedback.CONFIDENT,
          MoodFeedback.NERVOUS,
          MoodFeedback.TIRED,
        ].map((mood, index) => {
          return (
            <Pressable
              key={index}
              onPress={(e) => handleOnChangeMood(e, mood)}
              style={[
                styles.pressableStyle,
                {
                  opacity: currentMood === mood ? 1 : 0.2,
                },
              ]}
            >
              <MoodIconWrapper
                mood={mood}
                subtitle={mood}
                isSelected={currentMood === mood}
                iconStyle={{
                  width: 48,
                  height: 48,
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 8,
  },
  emojiButtonView: {
    backgroundColor: 'white',
    borderColor: ThemeColors.primary.octopus,
    width: 80,
  },
  emojiButtonText: {
    color: ThemeColors.primary.octopus,
    fontSize: 12,
  },
  pressableStyle: {
    width: 64,
    height: 84,
    opacity: 0.2,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
