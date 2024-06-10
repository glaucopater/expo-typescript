import { SyntheticEvent, useState } from 'react';
import {
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ThemeColors } from '../../theme';
import { getShortMonthNames } from '../../utils';
import { ReminderButton } from '../ReminderButton';

type TimeFilterModalProps = {
  modalVisible: boolean;
  setModalVisible: Function;
  year?: number;
  month?: number;
  setCurrentFilter: Function;
};

const months = getShortMonthNames();

export const TimeFilterModal = ({
  modalVisible,
  setModalVisible,
  month,
  year,
  setCurrentFilter,
}: TimeFilterModalProps) => {
  const [currentMonth, setCurrentMonth] = useState<string>(
    months[month] || months[0]
  );
  const [currentYear, setCurrentYear] = useState<number>(
    year || new Date().getFullYear()
  );

  const handleOnSelect = (_e: SyntheticEvent, month: string) => {
    setCurrentMonth(month);
    setModalVisible(false);
    setCurrentFilter(currentYear, month);
  };

  const handleOnDecreaseYear = () => {
    setCurrentYear(() => currentYear - 1);
  };

  const handleOnIncreaseYear = () => {
    setCurrentYear(() => currentYear + 1);
  };

  return (
    <View
      style={{
        backgroundColor: 'gray',
      }}
    >
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        style={styles.modalView}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Pressable onPress={handleOnDecreaseYear}>
                <ImageBackground
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  source={require('../../assets/images/chevronLeftPurple.png')}
                />
              </Pressable>
              <Text
                style={{
                  fontFamily: 'Lato',
                  fontStyle: 'normal',
                  fontWeight: '800',
                  fontSize: 20,
                  lineHeight: 20,
                  display: 'flex',
                  color: ThemeColors.primary.darkPurple,
                }}
              >
                {currentYear}
              </Text>
              <Pressable
                onPress={handleOnIncreaseYear}
                disabled={!(currentYear < new Date().getFullYear())}
                style={{
                  opacity: !(currentYear < new Date().getFullYear()) ? 0.5 : 1,
                }}
              >
                <ImageBackground
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  source={require('../../assets/images/chevronRightPurple.png')}
                />
              </Pressable>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginVertical: 16,
                justifyContent: 'center',
                maxWidth: 300,
              }}
            >
              {months.map((month, index) => {
                // skip future month
                const isFutureMonth =
                  new Date().getFullYear() === currentYear &&
                  index <= new Date().getMonth();
                const isPassedYear = currentYear < new Date().getFullYear();
                return (
                  <ReminderButton
                    key={index}
                    isDisabled={!isPassedYear && !isFutureMonth}
                    onClickEvent={(e) => handleOnSelect(e, month)}
                    label={month}
                    isSelected={currentMonth === month}
                    textStyle={{
                      color:
                        currentMonth === month
                          ? ThemeColors.primary.white
                          : ThemeColors.primary.octopus,
                    }}
                    viewStyle={{
                      maxWidth: 72,
                      opacity: !isPassedYear && !isFutureMonth ? 0.5 : 1,
                      margin: 4,
                      backgroundColor:
                        currentMonth === month
                          ? ThemeColors.primary.darkPurple
                          : ThemeColors.primary.white,
                      marginVertical: 4,
                      borderWidth: 2,
                      borderColor:
                        currentMonth === month
                          ? ThemeColors.primary.darkPurple
                          : ThemeColors.primary.octopus,
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: ThemeColors.shadow.backdrop1,
  },
  modalView: {
    margin: 20,
    backgroundColor: ThemeColors.primary.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 400,
    shadowRadius: 4,
    shadowColor: ThemeColors.primary.darkPurple,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 8,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
