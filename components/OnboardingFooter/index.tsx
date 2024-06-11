import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

import { saveIsOnboarded } from "../../api";
import { ThemeColors } from "../../theme";
import { GenericButton } from "../GenericButton";

export const OnboardingFooter = ({
  navigation,
  params,
}: {
  navigation: any;
  params?: any;
}) => {
  const { name: currentRouteName } = useRoute();

  const handleOnDone = () => {
    saveIsOnboarded();
    navigation.navigate("Home");
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {["Step2"].includes(currentRouteName) && (
        <>
          <GenericButton
            viewStyle={{
              width: "100%",
              marginTop: 16,
              backgroundColor: ThemeColors.primary.darkPurple,
              height: 64,
              alignSelf: "center",
            }}
            textStyle={{
              fontFamily: "Lato",
              fontWeight: "700",
              fontSize: 14,
            }}
            label={"Next"}
            onClickEvent={() => navigation?.navigate("Step3")}
          />
          <GenericButton
            viewStyle={{
              width: "100%",
              marginTop: 16,
              backgroundColor: "transparent",
              borderColor: "transparent",
              height: 64,
              alignSelf: "center",
            }}
            textStyle={{
              fontFamily: "Lato",
              fontWeight: "700",
              color: ThemeColors.primary.octopus,
              fontSize: 14,
            }}
            label={"Back"}
            onClickEvent={() => navigation?.navigate("Onboarding")}
          />
        </>
      )}

      {["Step3"].includes(currentRouteName) && (
        <GenericButton
          viewStyle={{
            width: "100%",
            marginTop: 16,
            backgroundColor: ThemeColors.primary.darkPurple,
            height: 64,
            alignSelf: "center",
          }}
          textStyle={{
            fontFamily: "Lato",
            fontWeight: "700",
            fontSize: 14,
            color: ThemeColors.primary.white,
          }}
          label={"Done"}
          onClickEvent={handleOnDone}
          testID="onboarding-done"
        />
      )}
      {["Onboarding", "Step3"].includes(currentRouteName) && (
        <>
          <GenericButton
            viewStyle={{
              width: "100%",
              marginTop: 16,
              backgroundColor:
                currentRouteName === "Onboarding"
                  ? ThemeColors.primary.darkPurple
                  : "transparent",
              height: 64,
              alignSelf: "center",
              borderColor:
                currentRouteName === "Onboarding"
                  ? ThemeColors.primary.darkPurple
                  : "transparent",
            }}
            textStyle={{
              fontFamily: "Lato",
              fontWeight: "700",
              fontSize: 14,
              color:
                currentRouteName === "Onboarding"
                  ? ThemeColors.primary.white
                  : ThemeColors.primary.octopus,
            }}
            label={currentRouteName === "Onboarding" ? "Next" : "Back"}
            onClickEvent={() => navigation?.navigate("Step2")}
          />
          {currentRouteName === "Onboarding" && (
            <View
              style={{
                height: 64,
              }}
            ></View>
          )}
        </>
      )}
    </View>
  );
};
