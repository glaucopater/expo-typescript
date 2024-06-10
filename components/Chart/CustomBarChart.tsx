import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ThemeColors, ThemeFonts } from '../../theme';
import { ChartConfig, ChartData } from 'react-native-chart-kit/dist/HelperTypes';

 
function hexToRgba(hex, opacity) {
  const hexWithoutHash = hex.replace('#', '');
  const bigint = parseInt(hexWithoutHash, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


export type BarDataType = {
  labels: string[],
  datasets: {
    data: number[],
  }[]
}

export const barData = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  datasets: [
    {
      data: [4, 2, 2, 3, 5, 1, 2],
    },
  ],
};


const chartConfig: ChartConfig =
{
  backgroundColor: ThemeColors.primary.white, // '#e26a00',
  backgroundGradientFrom: ThemeColors.primary.white, // '#fb8c00',
  backgroundGradientTo: ThemeColors.primary.white, // '#ffa726',
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => hexToRgba(ThemeColors.primary.darkPurple, opacity),
  labelColor: (opacity = 1) => hexToRgba(ThemeColors.primary.darkPurple, opacity),
  style: {
    borderRadius: 16,
  },
  barPercentage: 0.5,
  propsForLabels: {
    fontFamily: ThemeFonts.secondary.fontFamily,
    fontSize: 12,
  }

}


// a method that returns random integer between 0 and 6
const getRandomInteger = (): number => {
  return Math.floor(Math.random() * 7);
};

// a method that the list of the months
const getMonthList = (): string[] => {
  return ['January', 'February', 'March', 'April', 'May', 'June'];
};

// a method that return the list of the week days starting from monday
const getWeekList = (): string[] => {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}

export const BaseColors = () => [
  (opacity = 1) => hexToRgba(ThemeColors.secondary.lightGreen, opacity),
  (opacity = 1) => hexToRgba(ThemeColors.secondary.yellow, opacity),
  (opacity = 1) => hexToRgba(ThemeColors.secondary.lilac, opacity),
  (opacity = 1) => hexToRgba(ThemeColors.secondary.sproutGreen, opacity),
  (opacity = 1) => hexToRgba(ThemeColors.secondary.lilac, opacity),
  (opacity = 1) => hexToRgba(ThemeColors.primary.liveGreen, opacity),
  (opacity = 1) => hexToRgba(ThemeColors.secondary.yellow, opacity),
]

export const mockData = {
  labels: getWeekList(),
  datasets: [
    {
      data: [4, 2, 2, 3, 5, 1, 2],
      colors: BaseColors(),
    },
  ],
};

export const CustomLineChart = ({ data }: { data?: BarDataType }) => {

  const transformedData: ChartData = {
    labels: getWeekList(),
    datasets: [
      { ...data.datasets[0], colors: BaseColors() }
    ]
  };

  // const screenWidth = Dimensions.get("window").width;

  return (
    <View
    style={{
      width: '100%',
    }}
      onStartShouldSetResponder={() => true}
    >
      <Text style={styles.smallText}>Weekly Trend</Text>
      <BarChart
        fromZero
        withInnerLines={false}
        flatColor
        showBarTops={false}
        data={transformedData}
        width={(350)} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          ...chartConfig,
          barRadius: 6,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 8,
          width: '100%',

        }}
        withCustomBarColorFromData
      />
    </View>
  );
};

const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'Suez-One',
    fontSize: 20,
  },
});
