import { render } from "@testing-library/react-native";
import React from "react";

import {
  AggressiveIcon,
  ConfidentIcon,
  GlassesIcon,
  HappyIcon,
  NaturalIcon,
  NervousIcon,
  ReminderActiveIcon,
  ReminderIcon,
  SadIcon,
  SmallMinusIcon,
  SmallPlusIcon,
  TerribleIcon,
  TimerIcon,
  TiredIcon,
} from ".";

describe("Icons", () => {
  it("should render HappyIcon", () => {
    const { getByTestId } = render(<HappyIcon />);
    const component = getByTestId("happy-icon");
    expect(component).toBeDefined();
  });

  it("should render ConfidentIcon", () => {
    const { getByTestId } = render(<ConfidentIcon />);
    const component = getByTestId("confident-icon");
    expect(component).toBeDefined();
  });

  it("should render TerribleIcon", () => {
    const { getByTestId } = render(<TerribleIcon />);
    const component = getByTestId("terrible-icon");
    expect(component).toBeDefined();
  });

  it("should render TiredIcon", () => {
    const { getByTestId } = render(<TiredIcon />);
    const component = getByTestId("tired-icon");
    expect(component).toBeDefined();
  });

  it("should render SadIcon", () => {
    const { getByTestId } = render(<SadIcon />);
    const component = getByTestId("sad-icon");
    expect(component).toBeDefined();
  });

  it("should render NaturalIcon", () => {
    const { getByTestId } = render(<NaturalIcon />);
    const component = getByTestId("natural-icon");
    expect(component).toBeDefined();
  });

  it("should render AggressiveIcon", () => {
    const { getByTestId } = render(<AggressiveIcon />);
    const component = getByTestId("aggressive-icon");
    expect(component).toBeDefined();
  });

  it("should render NervousIcon", () => {
    const { getByTestId } = render(<NervousIcon />);
    const component = getByTestId("nervous-icon");
    expect(component).toBeDefined();
  });

  it("should render TimerIcon", () => {
    const { getByTestId } = render(<TimerIcon />);
    const component = getByTestId("timer-icon");
    expect(component).toBeDefined();
  });

  it("should render GlassesIcon", () => {
    const { getByTestId } = render(<GlassesIcon />);
    const component = getByTestId("glasses-icon");
    expect(component).toBeDefined();
  });

  it("should render ReminderActiveIcon", () => {
    const { getByTestId } = render(<ReminderActiveIcon />);
    const component = getByTestId("reminder-active-icon");
    expect(component).toBeDefined();
  });

  it("should render ReminderIcon", () => {
    const { getByTestId } = render(<ReminderIcon />);
    const component = getByTestId("reminder-icon");
    expect(component).toBeDefined();
  });

  it("should render SmallPlusIcon", () => {
    const { getByTestId } = render(<SmallPlusIcon />);
    const component = getByTestId("small-plus-icon");
    expect(component).toBeDefined();
  });

  it("should render SmallMinusIcon", () => {
    const { getByTestId } = render(<SmallMinusIcon />);
    const component = getByTestId("small-minus-icon");
    expect(component).toBeDefined();
  });
});
