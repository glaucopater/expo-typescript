import { Modal, StyleSheet, View } from 'react-native';

import { Drink } from '../../api/models';
import { ThemeColors } from '../../theme';
import { EditDrink } from '../EditDrink';

export type EditDrinksModalProps = {
  modalVisible: boolean;
  setModalVisible: any;
  onSave: any;
  onUpdate: any;
  onClose: any;
  onRemove: any;
  navigation: any;
  route: any;
  activeDrink?: Drink;
};

export const EditDrinksModal = ({
  modalVisible,
  setModalVisible,
  onSave,
  onUpdate,
  onRemove,
  activeDrink,
}: EditDrinksModalProps) => {
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
          <EditDrink
            onSaveNewDrink={onSave}
            onUpdateDrink={onUpdate}
            onRemove={onRemove}
            activeDrink={activeDrink}
          />
        </View>
      </View>
    </Modal>
  );
};

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
    padding: 8,
    alignItems: 'center',
    width: '100%',
    height: '90%',
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
