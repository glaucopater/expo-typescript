import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import React from 'react';
import { Platform } from 'react-native';

import { getAppDetails } from '../../api';
import { ThemeColors } from '../../theme';
import { GenericButton } from '../GenericButton';

export const DownloadButton = () => {
  const downloadData = async () => {
    const now = new Date();
    const datetime = format(now, 'yyyy-MM-ddTHH-mm-ss');

    if (Platform.OS !== 'web') {
      try {
        const fileUri =
          FileSystem.documentDirectory + 'data_' + datetime + '.json';

        const data = await getAppDetails();
        const jsonData = JSON.stringify(data);

        console.log('Backup', jsonData, fileUri);

        await FileSystem.writeAsStringAsync(fileUri, jsonData);

        console.log('AsyncStorage data written to ', fileUri);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <GenericButton
      viewStyle={{
        backgroundColor: 'transparent',
        width: '100%',
        borderWidth: 0,
        height: 56,
        justifyContent: 'flex-start',
        display: 'flex',
        padding: 0,
      }}
      textStyle={{
        color: ThemeColors.primary.octopus,
      }}
      testID="download-backup"
      label="Backup My Data"
      onClickEvent={downloadData}
    />
  );
};
