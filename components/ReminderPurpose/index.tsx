import { View } from 'react-native';

import { EventPurpose } from '../../api/models';
import { ReminderButton } from '../ReminderButton';

type ReminderPurposeProps = {
  onSelect: (_e: any, eventPurpose: EventPurpose) => void;
  currentEventPurpose: EventPurpose;
};

export const ReminderPurpose = ({
  onSelect,
  currentEventPurpose,
}: ReminderPurposeProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 16,
      }}
    >
      {Object.values(EventPurpose).map((eventPurpose, index) => (
        <ReminderButton
          key={index}
          onClickEvent={(e) => onSelect(e, eventPurpose)}
          label={eventPurpose}
          isSelected={currentEventPurpose === eventPurpose}
        />
      ))}
    </View>
  );
};
