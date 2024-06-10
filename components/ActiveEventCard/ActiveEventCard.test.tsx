import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { BoozyBFEvent, RunningBoozyBFEvent } from "../../api/models";
import { ActiveEventCard } from ".";

const mockEvent = {
  id: "123",
  name: "Event name",
  reminderLeavingTime: [10, 30],
  numberOfGlasses: 10,
  isCompleteEvent: false,
  date: new Date().getTime(),
  lastUpdate: new Date().getTime(),
};

describe("ActiveEventCard", () => {
  it("should render event name", () => {
    const { getByText } = render(
      <ActiveEventCard event={mockEvent} isCompleteEvent={false} />
    );
    expect(getByText("Event name")).toBeDefined();
  });

  it("should render reminder leaving time", () => {
    const { getByText } = render(
      <ActiveEventCard event={mockEvent} isCompleteEvent={false} />
    );
    expect(getByText("Leaving Time 10:30")).toBeDefined();
  });

  it('should render "Complete my event diary" when isCompleteEvent is true', () => {
    const { getByText } = render(
      <ActiveEventCard event={mockEvent} isCompleteEvent={true} />
    );
    expect(getByText("Complete my event diary")).toBeDefined();
  });

  it("should navigate to EventsDetails when the card is pressed and navigation is provided", () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByTestId } = render(
      <ActiveEventCard
        event={mockEvent}
        isCompleteEvent={false}
        navigation={mockNavigation}
      />
    );
    fireEvent.press(getByTestId("active-event-card"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      "EventsDetails",
      mockEvent
    );
  });
});
