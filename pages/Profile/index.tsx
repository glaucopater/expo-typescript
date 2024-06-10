import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import appPackage from '../../../package.json';
import { getCurrentGoal, getMaxPerMonthGlasses } from '../../api';
import { UserGoals } from '../../api/models';
import { DownloadButton } from '../../components/Backup';
import { ProfileSettingsCard } from '../../components/ProfileSettingsCard';
import { AppIcon, UserIcon } from '../../components/Shared';
import { FixedPageTemplate } from '../../templates/Onboarding';
import { ThemeColors } from '../../theme';
import { styles, stylesExtended } from './Profile.styles';

SplashScreen.preventAutoHideAsync();

export const Profile = ({ navigation }: { navigation: any; params?: any }) => {
  const [, setTextInputValue] = useState(0);
  const [maxPerMonthGlassesCounter, setPerMonthGlassesCounter] = useState(0);
  const [currentGoal, setCurrentGoal] = useState<UserGoals | null>();

  const isDownloadEnabled =
    process.env.EXPO_PUBLIC_BACKUP_DATA_ENABLED === 'true';

  const fetchData = async () => {
    const storedMaxPerMonthGlassesdata = await getMaxPerMonthGlasses();
    const storedCurrentGoal = await getCurrentGoal();

    return {
      maxPerMonthGlasses: Number(storedMaxPerMonthGlassesdata),
      goal: storedCurrentGoal,
    };
  };

  const reloadDataAfterFetch = () => {
    fetchData()
      .then(({ maxPerMonthGlasses, goal }) => {
        if (maxPerMonthGlasses) {
          setPerMonthGlassesCounter(maxPerMonthGlasses);
          setTextInputValue(maxPerMonthGlasses);
          setCurrentGoal(goal);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    reloadDataAfterFetch();
  }, [maxPerMonthGlassesCounter, currentGoal]);

  const handleOnLoadData = async () => {
    console.log('load data');
  };

  useEffect(() => {
    handleOnLoadData();
  }, []);

  const handleUndoOnboarding = () => {
    navigation.navigate('Step2');
  };

  const handleOnEditSettings = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <FixedPageTemplate
      viewStyle={{
        backgroundColor: ThemeColors.primary.white,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <UserIcon />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 100,
          margin: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            ...stylesExtended.sectionTitle,
            fontWeight: '800',
          }}
        >
          Personal Details
        </Text>

        <ProfileSettingsCard onPress={handleOnEditSettings}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Text
              style={{
                ...stylesExtended.label,
                fontWeight: '700',
                fontStyle: 'normal',
              }}
            >
              My Goal
            </Text>

            <Text
              style={{
                fontFamily: 'Lato',
                fontStyle: 'normal',
                fontWeight: '900',
                fontSize: 16,
                lineHeight: 26,
                color: ThemeColors.primary.darkPurple,
              }}
            >
              {UserGoals[currentGoal]}
            </Text>
          </View>
        </ProfileSettingsCard>
        <ProfileSettingsCard onPress={handleUndoOnboarding}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Text
              style={{
                fontFamily: 'Lato',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 12,
                lineHeight: 16,
                color: ThemeColors.primary.textGray,
              }}
            >
              Drink Limit
            </Text>
            <Text
              style={{
                fontFamily: 'Lato',
                fontStyle: 'normal',
                fontWeight: '900',
                fontSize: 16,
                lineHeight: 26,
                color: ThemeColors.primary.darkPurple,
              }}
            >
              {maxPerMonthGlassesCounter} Drinks a month
            </Text>
          </View>
        </ProfileSettingsCard>
      </View>

      {isDownloadEnabled && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 100,
            margin: 16,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              fontFamily: 'Lato',
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: 12,
              lineHeight: 16,
              color: ThemeColors.primary.textGray,
            }}
          >
            Data Backup
          </Text>
          <DownloadButton />
        </View>
      )}

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 100,
          margin: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            color: ThemeColors.primary.darkPurple,
            fontSize: 20,
            fontWeight: '800',
            lineHeight: 36,
            fontFamily: 'Lato',
            width: '100%',
          }}
        >
          Contact Us
        </Text>

        <ProfileSettingsCard>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Text
              style={{
                fontFamily: 'Lato',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 12,
                lineHeight: 16,
                color: ThemeColors.primary.textGray,
              }}
            >
              Send Feedback
            </Text>
            <Pressable
              onPress={(e) => {
                e.preventDefault();
                window.location.href = 'mailto:boozybf@gmail.com';
              }}
            >
              <Text
                style={{
                  fontFamily: 'Lato',
                  fontStyle: 'normal',
                  fontWeight: '900',
                  fontSize: 16,
                  lineHeight: 26,
                  color: ThemeColors.primary.darkPurple,
                }}
              >
                Boozybf@gmail.com
              </Text>
            </Pressable>
          </View>
        </ProfileSettingsCard>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AppIcon />
          <Text
            style={{
              color: ThemeColors.primary.darkPurple,
              fontSize: 12,
              fontWeight: '700',
            }}
          >
            BoozyBF
          </Text>
          <Text
            style={{
              color: ThemeColors.primary.textGray,
              fontSize: 12,
            }}
          >
            Demo Version {appPackage.version}
          </Text>
          <Text
            style={{
              color: ThemeColors.primary.textGray,
              fontSize: 12,
            }}
          >
            All rights reserved
          </Text>
        </View>
      </View>
    </FixedPageTemplate>
  );
};
