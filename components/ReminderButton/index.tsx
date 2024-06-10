import { ThemeColors } from '../../theme';
import { GenericButton } from '../GenericButton';

export const ReminderButton = (props: any) => {
  return (
    <GenericButton
      viewStyle={{
        width: 106,
        margin: 4,
        backgroundColor: props.isSelected
          ? ThemeColors.primary.octopus
          : ThemeColors.primary.anotherPurple,
      }}
      {...props}
    />
  );
};
