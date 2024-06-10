import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import { BoozyBFEvent, Tags } from '../../api/models';
import { ThemeColors, ThemeFonts } from '../../theme';
import { getDaysUntilEvent, getLastDays } from '../../utils';
import { StatusBadge } from '../StatusBadge';
import Widget from '../Widget';

const Track = ({
  eventsCounter,
  maxGlassesPerMonth,
  currentGlasses,
  glassesTotalAmount,
  moreRecentEvent,
  textInputValue,
}: {
  eventsCounter: number;
  maxGlassesPerMonth: number;
  currentGlasses: number;
  glassesTotalAmount: number;
  moreRecentEvent: BoozyBFEvent;
  textInputValue: Number | string;
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.body}>
          <View
            style={{
              display: 'flex',
              flexBasis: '50%',
              width: '100%',
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  width: '100%',
                  fontWeight: 'bold',
                  fontFamily: ThemeFonts.secondary.fontFamily,
                },
              ]}
            >
              Monthly limit
            </Text>
            <StatusBadge
              status={
                currentGlasses >= maxGlassesPerMonth ? Tags.BAD : Tags.GOOD
              }
              label={
                currentGlasses >= maxGlassesPerMonth ? 'Warning' : 'On Track'
              }
            />
          </View>
          <View
            style={{
              flexBasis: '50%',
              alignItems: 'flex-end',
              display: 'flex',
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  width: 'auto',
                  fontWeight: 'bold',
                  fontFamily: ThemeFonts.secondary.fontFamily,
                },
              ]}
            >
              {textInputValue + ' Glasses'}
            </Text>
            <Text style={styles.subtitle}>
              Avg {Number(textInputValue) / 4} drinks a week
            </Text>
          </View>
        </View>
        <ImageBackground
          style={{
            width: '100%',
            height: 1,
            padding: 8,
            backgroundColor: ThemeColors.primary.white,
          }}
          source={require('../../assets/images/breakerLight.png')}
        />
        <View style={styles.footer}>
          <View
            style={{
              width: '100%',
              flexBasis: '50%',
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: ThemeFonts.secondary.fontFamily,
                },
              ]}
            >
              Previous drink
            </Text>
          </View>
          <View
            style={{
              flexBasis: '50%',
              alignItems: 'flex-end',
              width: 'auto',
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  fontFamily: ThemeFonts.secondary.fontFamily,
                  fontWeight: 'bold',
                  width: 'auto',
                },
              ]}
            >
              {getLastDays(moreRecentEvent)}
            </Text>
          </View>
        </View>
        <View style={styles.widgetContainer}>
          <Widget
            title="Totally monthly Drink day"
            content={String(eventsCounter) + ' days'}
          />
          <Widget
            title="Totally monthly Drink spent"
            content={String(glassesTotalAmount ?? 0) + '€'}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    color: ThemeColors.primary.white,
    lineHeight: '65px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Suez-One',
    fontSize: 20,
    width: 223,
    height: 26,
    color: ThemeColors.primary.darkPurple,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: 'rgba(0, 0, 0, 0.7)',
    marginTop: 8,
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: ThemeColors.primary.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 0,
    shadowColor: ThemeColors.primary.darkPurple,
  },
  footer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingTop: 0,
    paddingBottom: 8,
    paddingHorizontal: 16,
    shadowColor: ThemeColors.primary.darkPurple,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: ThemeColors.primary.white,
  },
  widgetContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 0,
    justifyContent: 'space-between',
  },
});

export default Track;
