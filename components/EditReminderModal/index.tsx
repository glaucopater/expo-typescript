import { Modal, StyleSheet, Text, View } from 'react-native';

import { ReminderFrequency } from '../../api/models';
import { ThemeColors } from '../../theme';
import { GenericButton } from '../GenericButton';

export const EditReminderModal = ({
  modalVisible,
  setModalVisible,
  setReminderSelection,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={stylesModal.modalHeader}>
            <Text style={stylesModal.titleText}>Start remind</Text>
          </View>
          {Object.values(ReminderFrequency).map((frequency, index) => {
            return (
              <GenericButton
                key={index}
                onClickEvent={() => {
                  setReminderSelection(frequency);
                  setModalVisible(!modalVisible);
                }}
                label={frequency}
                viewStyle={{
                  margin: 8,
                }}
              />
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: ThemeColors.primary.white,
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
    alignItems: 'flex-start',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(27, 20, 39, 1)',
    padding: 8,
    margin: 8,
    marginTop: 32,
    borderRadius: 8,
    width: 70,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  closeButtonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '50%',
    borderWidth: 1,
    borderColor: 'rgba(27, 20, 39, 1)',
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: ThemeColors.shadow.backdrop1,
  },
  modalView: {
    margin: 20,
    backgroundColor: ThemeColors.primary.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    height: 300,
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
  buttonClose: {
    backgroundColor: ThemeColors.primary.darkPurple,
    padding: 16,
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
