import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ReminderFrequency } from '../../api/models';
import { ThemeColors } from '../../theme';
import { EditReminderModal } from '../EditReminderModal';
import { NumericCounter } from '../NumericCounter';

type ReminderCounterProps = {
  isStart?: boolean;
  title?: string;
  reminderSelection?: ReminderFrequency;
  setReminderSelection?: (frequency: ReminderFrequency) => void;
  timer?: number[];
  setReminderLeavingTime?: any;
  setCurrentEstimatedLeavingTime?: any;
  shiftNumber?: number;
  isReadonly?: boolean;
};

export const ReminderCounter = (props: ReminderCounterProps) => {
  const [currentHours, setCurrentHours] = useState(
    props.timer && props.timer[0] ? props.timer[0] : 0
  );
  const [currentMinutes, setCurrentMinutes] = useState(
    props.timer && props.timer[1] ? props.timer[1] : 0
  );
  const [modalVisible, setModalVisible] = useState(false);

  // too slow on device
  useEffect(() => {
    if (props.timer) {
      setCurrentHours(props.timer[0]);
      setCurrentMinutes(props.timer[1]);
    }
  }, [props.timer]);

  const handleOnEditSettings = () => {
    setModalVisible(true);
  };

  const saveValueFunction = () => {
    setModalVisible(false);
  };

  const handleUpdateHours = (val) => {
    setCurrentHours(val);
    if (props.setReminderLeavingTime && props.setCurrentEstimatedLeavingTime) {
      props.setReminderLeavingTime([val, currentMinutes]);
      const d = new Date();
      d.setHours(val);
      d.setMinutes(currentMinutes);
      props.setCurrentEstimatedLeavingTime(d.getTime());
    }
  };

  const handleUpdateMinutes = (val) => {
    setCurrentMinutes(val);
    if (props.setReminderLeavingTime && props.setCurrentEstimatedLeavingTime) {
      props.setReminderLeavingTime([currentHours, val]);
      const d = new Date();
      d.setHours(currentHours);
      d.setMinutes(val);
      props.setCurrentEstimatedLeavingTime(d.getTime());
    }
  };

  const edProps = {
    modalVisible,
    setModalVisible,
    saveValueFunction,
    setReminderSelection: props.setReminderSelection,
    reminderSelection: props.reminderSelection,
  };

  return (
    <View
      style={{
        marginVertical: 16,
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: ThemeColors.primary.darkPurple,
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          borderColor: ThemeColors.primary.octopus,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderColor: 'transparent',
            padding: 4,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 8,
              alignItems: 'center',
              width: '100%',
              justifyContent: props.title ? 'space-between' : 'center',
            }}
          >
            {props.title && (
              <Text
                style={{
                  color: ThemeColors.primary.white,
                  height: 'auto',
                  fontFamily: 'Lato',
                  fontSize: 16,
                  lineHeight: 20,
                  fontWeight: '900',
                  width: 100,
                }}
              >
                {props.title}
              </Text>
            )}
            <View
              style={{
                height: 60,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <NumericCounter
                isReadonly={props.isReadonly}
                currentValue={currentHours}
                setCurrentValue={handleUpdateHours}
                isHourFormat
              />
              <View
                style={{
                  width: 20,
                  height: 54,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  borderColor: 'transparent',
                }}
              >
                <Text
                  style={{
                    color: ThemeColors.primary.white,
                    fontFamily: 'Lato',
                    fontSize: 40,
                    fontWeight: '700',
                  }}
                >
                  :
                </Text>
              </View>
              <NumericCounter
                isReadonly={props.isReadonly}
                currentValue={currentMinutes}
                setCurrentValue={handleUpdateMinutes}
                isMinuteFormat
              />
            </View>
          </View>
          {props.isStart && (
            <>
              <EditReminderModal {...edProps} />
              <TouchableOpacity
                onPress={handleOnEditSettings}
                style={{
                  width: '100%',
                  height: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  flexShrink: 0,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: ThemeColors.primary.anotherPurple,
                  position: 'relative',
                }}
              >
                <Text>
                  <View
                    style={{
                      width: 272,
                      height: 24,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0,
                      borderColor: 'transparent',
                      position: 'relative',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        width: 272,
                        height: 24,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        flexShrink: 1,
                        alignSelf: 'auto',
                        borderRadius: 0,
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 4,
                          paddingHorizontal: 0,
                          flexGrow: 1,
                          borderColor: 'transparent',
                          left: 0,
                        }}
                      >
                        <Text
                          style={{
                            color: ThemeColors.primary.white,
                            height: 'auto',
                            textAlign: 'center',
                            marginRight: 0,
                            marginBottom: 0,
                            alignSelf: 'auto',
                            fontFamily: 'Lato',
                            fontSize: 12,
                            fontWeight: '700',
                          }}
                        >
                          <Text>{props.reminderSelection}</Text>
                        </Text>
                      </View>
                      <Image
                        source={require('../../assets/images/backarrow.png')}
                        style={{
                          width: 24,
                          height: 24,
                          position: 'absolute',
                          left: 248,
                        }}
                      ></Image>
                    </View>
                  </View>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
