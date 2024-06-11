import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

import { ThemeColors } from "../../theme";
import { GenericButton } from "../GenericButton";
import { HappyIcon } from "../Shared";

const getHeaderTitle = (step: string) => {
  switch (step) {
    case "Onboarding":
      return "Tell us what's in your mind";
    case "Step2":
      return "Set my drink limit";
    case "Step3":
      return "Awesome!";
  }
};

export const OnboardingHeader = ({ navigation }: { navigation: any }) => {
  const { name: currentRouteName } = useRoute();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 8,
        marginVertical: 8,
      }}
    >
      <HappyIcon />
      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          fontFamily: "Lato",
          color: ThemeColors.primary.darkPurple,
        }}
      >
        {getHeaderTitle(currentRouteName)}
      </Text>
      {currentRouteName !== "Step3" && (
        <GenericButton
          viewStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            width: "auto",
          }}
          textStyle={{
            fontSize: 12,
            fontWeight: "700",
            textDecorationLine: "underline",
            color: ThemeColors.primary.darkPurple,
          }}
          label="Skip"
          onClickEvent={() => navigation?.navigate("Home")}
        />
      )}
    </View>
  );
};
