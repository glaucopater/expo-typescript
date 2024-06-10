import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { DrinkCard } from ".";
import { Drink, DrinkType } from "../../api/models";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/DrinkCard",
  component: DrinkCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof DrinkCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DrinkCard> = (args) => (
  <DrinkCard {...args} />
);

const mockDrinkWine: Drink = {
  id: uuid(),
  name: "Glass of Montepulciano d'Abruzzo",
  type: DrinkType.WINE,
  alcoholPercentage: 0.13,
  quantity: 200,
  unitOfMeasurement: "ml",
  numberOfGlasses: 3,
};

export const WineDrink = Template.bind({});
WineDrink.args = {
  drink: mockDrinkWine,
};

const mockDrinkBeer: Drink = {
  id: uuid(),
  name: "Peroni",
  type: DrinkType.BEER,
  alcoholPercentage: 0.5,
  quantity: 400,
  unitOfMeasurement: "ml",
  numberOfGlasses: 3,
};

export const BeerDrink = Template.bind({});
BeerDrink.args = {
  drink: mockDrinkBeer,
};

const mockDrinkBottle: Drink = {
  id: uuid(),
  name: "Bottle of Champagne",
  type: DrinkType.BOTTLE,
  alcoholPercentage: 0.11,
  quantity: 330,
  unitOfMeasurement: "ml",
  numberOfGlasses: 3,
};

export const BottleDrink = Template.bind({});
BottleDrink.args = {
  drink: mockDrinkBottle,
};

const mockDrinkCocktail: Drink = {
  id: uuid(),
  name: "Whiskey Sour",
  type: DrinkType.COCKTAIL,
  alcoholPercentage: 0.7,
  quantity: 120,
  unitOfMeasurement: "ml",
  numberOfGlasses: 3,
};

export const CocktailDrink = Template.bind({});
CocktailDrink.args = {
  drink: mockDrinkCocktail,
};

const mockLongDrinkCocktail: Drink = {
  id: uuid(),
  name: "Manhattan",
  type: DrinkType.LONG_DRINK,
  alcoholPercentage: 0.17,
  quantity: 120,
  unitOfMeasurement: "ml",
  numberOfGlasses: 2,
};

export const LongDrink = Template.bind({});
LongDrink.args = {
  drink: mockLongDrinkCocktail,
};

export const ShortDrink = Template.bind({});
ShortDrink.args = {
  drink: { ...mockLongDrinkCocktail, type: DrinkType.SHORT_DRINK },
};
