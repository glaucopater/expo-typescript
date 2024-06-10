import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { View } from 'react-native';

import { TimeFilterModal } from '.';
import { GenericButton } from '../GenericButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TimeFilterModal',
  component: TimeFilterModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    setCurrentFilter: { action: 'setCurrentFilter' },
    setModalVisible: { action: 'setModalVisible' },
  },
} as ComponentMeta<typeof TimeFilterModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TimeFilterModal> = (args) => {
  const [modalVisible, setModalVisible] = useState(args.modalVisible);
  const handleOnClick = () => {
    args.setModalVisible();
    setModalVisible(() => !modalVisible);
  };
  return (
    <View>
      <GenericButton label="Toggle Modal" onClickEvent={handleOnClick} />
      <View
        style={{
          marginVertical: 200,
        }}
      >
        <TimeFilterModal
          modalVisible={modalVisible}
          setModalVisible={handleOnClick}
          year={args.year}
          month={args.month}
          setCurrentFilter={args.setCurrentFilter}
        />
      </View>
    </View>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  modalVisible: true,
};

export const Past = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Past.args = {
  modalVisible: true,
  year: 2020,
  month: 3,
};
