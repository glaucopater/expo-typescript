import { ScrollView, Text, View } from 'react-native';

import { getShortMonthNames } from '../../utils';
import { BackArrowIcon } from '../Shared';
import { styles } from './TimeSwimlane.styles';

export type TimeSwimlaneProps = {
  year: number;
  month: number;
};

export const TimeSwimlane = ({
  year,
  month: selectedMonth,
}: TimeSwimlaneProps) => {
  const months = getShortMonthNames();

  return (
    <View style={styles.container}>
      <View style={styles.yearTag}>
        <Text style={styles.yearTagText}>{year}</Text>
        <BackArrowIcon iconStyle={{ width: 16, height: 16 }} />
      </View>
      <ScrollView
        horizontal
        style={[
          styles.monthTagContainer,
          {
            overflow: 'hidden',
          },
        ]}
      >
        {months.map((month, index) => {
          return (
            <View
              key={index}
              style={[
                styles.monthTag,
                month === months[selectedMonth - 1] && styles.monthTagSelected,
              ]}
            >
              <Text
                style={[
                  styles.monthTagText,
                  month === months[selectedMonth - 1] &&
                    styles.monthTagTextSelected,
                ]}
              >
                {month}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
