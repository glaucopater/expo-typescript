import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Drink } from '../../api/models';
import { DrinkCard } from '../DrinkCard';
import { EditDrinksModal } from '../EditDrinksModal';

export type EditDrinkWrapperProps = {
  navigation: any;
  route: any;
  setEventDrinks: any;
  eventDrinks: Drink[];
  drink?: Drink;
};

export const EditDrinkWrapper = ({
  navigation,
  route,
  setEventDrinks,
  eventDrinks,
  drink,
}: EditDrinkWrapperProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeDrink, setActiveDrink] = useState<Drink | undefined>(drink);

  const handleOnOpenModal = () => {
    setModalVisible(true);
  };

  const onSave = (drink: Drink) => {
    setEventDrinks([...eventDrinks, drink]);
    setModalVisible(false);
    setActiveDrink(undefined);
  };

  const onUpdate = (drink: Drink) => {
    const otherDrinks = eventDrinks.filter((d) => d.id !== drink.id);
    setEventDrinks([...otherDrinks, drink]);
    setModalVisible(false);
    setActiveDrink(undefined);
  };

  const onRemove = (drink: Drink) => {
    const otherDrinks = eventDrinks.filter((d) => d.id !== drink.id);
    setEventDrinks([...otherDrinks]);
    setModalVisible(false);
    setActiveDrink(undefined);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const handleEditDrink = (drink: Drink) => {
    setActiveDrink(drink);
    handleOnOpenModal();
  };

  const EditDrinksModalProps = {
    navigation,
    route,
    modalVisible,
    setModalVisible,
    onSave,
    onUpdate,
    onClose,
    onRemove,
    activeDrink,
  };

  return (
    <>
      <EditDrinksModal {...EditDrinksModalProps} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}
      >
        <Text style={styles.smallText}>My drinks</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Pressable onPress={handleOnOpenModal}>
            <Text
              style={{
                fontFamily: 'Lato',
                fontSize: 14,
                fontWeight: '800',
                lineHeight: 16,
                textDecorationLine: 'underline',
              }}
            >
              Add
            </Text>
          </Pressable>
        </View>
      </View>
      {eventDrinks?.length > 0 && (
        <View>
          {eventDrinks.map((drink, index) => (
            <DrinkCard key={index} drink={drink} editDrink={handleEditDrink} />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'Suez-One',
    fontSize: 20,
  },
});
