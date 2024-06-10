import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemeColors } from '../../theme';

export const EditSettingsModal = ({
  modalVisible,
  setModalVisible,
  setTextInputValue,
  saveValueFunction,
  textInputValue,
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
            <Text style={stylesModal.titleText}>Set max glasses per month</Text>
          </View>
          <TextInput
            placeholder="Enter your monthly limit"
            value={String(textInputValue)}
            onChangeText={(data) => setTextInputValue(Number(data))}
            underlineColorAndroid="transparent"
            style={stylesModal.textInputStyle}
            maxLength={2}
          />
          <View style={stylesModal.buttonsContainer}>
            <TouchableOpacity
              onPress={saveValueFunction}
              style={stylesModal.buttonStyle}
            >
              <Text style={stylesModal.buttonTextStyle}> Save </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={stylesModal.buttonStyle}
            >
              <Text style={stylesModal.buttonTextStyle}> Close </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  buttonStyle: {
    fontSize: 16,
    color: ThemeColors.primary.white,
    backgroundColor: ThemeColors.primary.darkPurple,
    padding: 8,
    margin: 4,
    borderRadius: 8,
    width: '100%',
  },
  buttonTextStyle: {
    padding: 5,
    color: ThemeColors.primary.white,
    textAlign: 'center',
  },
  closeButtonTextStyle: {
    padding: 5,
    color: ThemeColors.primary.white,
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: ThemeColors.primary.octopus,
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
    backgroundolor: 'white',
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
    backgroundColor: 'rgba(27, 20, 39, 1)',
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
