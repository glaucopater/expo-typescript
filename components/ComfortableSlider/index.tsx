import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { View } from 'react-native';

import { BoozyBFEvent, EventComfortableLevel } from '../../api/models';
import { ThemeColors } from '../../theme';
import { getComfortableLevelIconComponent } from '../MoodIconWrapper';

const sadImage = require(`../../assets/images/comfortableLevels/sad.png`);
const naturalImage = require(
  `../../assets/images/comfortableLevels/natural.png`
);
const happyImage = require(`../../assets/images/comfortableLevels/happy.png`);

export const mappedLevel = Object.keys(EventComfortableLevel).map(
  (key: EventComfortableLevel, index: number) => ({
    key,
    index,
  })
);

export function mapValueToLevel(currentValue: number): EventComfortableLevel {
  return mappedLevel.find((item) => item.index === currentValue)
    .key as EventComfortableLevel;
}

export function mapLevelToValue(currentValue: EventComfortableLevel): number {
  const searchedValue = mappedLevel.find(
    (item) => item.key === currentValue.toUpperCase()
  );
  if (searchedValue?.index) return searchedValue.index;
}

export const ComfortableSlider = ({
  comfortableLevel,
  onChange,
}: {
  comfortableLevel: BoozyBFEvent['comfortableLevel'];
  onChange: Function;
}) => {
  // mapping EventComfortableLevel to numeric value
  const [currentValue, setCurrentValue] = useState(
    mapLevelToValue(comfortableLevel || EventComfortableLevel.HAPPY)
  );

  const handleOnChangecomfortableLevel = (value) => {
    setCurrentValue(value);
    const newValue: EventComfortableLevel = mapValueToLevel(value);
    onChange(newValue);
  };

  const level = mappedLevel.find((_item, index) => index === currentValue);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
      }}
    >
      {getComfortableLevelIconComponent(EventComfortableLevel[level.key])}
      <Slider
        trackImage={naturalImage}
        minimumTrackImage={sadImage}
        maximumTrackImage={happyImage}
        thumbTintColor={ThemeColors.primary.anotherGrey}
        minimumTrackTintColor={ThemeColors.primary.liveGreen}
        maximumTrackTintColor={ThemeColors.primary.liveGreen}
        style={{ width: '85%', marginHorizontal: 4 }}
        minimumValue={0}
        maximumValue={mappedLevel.length - 1}
        step={1}
        value={currentValue}
        onValueChange={handleOnChangecomfortableLevel}
      />
    </View>
  );
};
