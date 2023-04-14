import { render } from "@testing-library/react";
import { Card } from "../components/Card";

describe("Card", () => {
  const props = {
    dt_text: "2023-04-14 18:00:00",
    icon: "01d",
    temp: 72,
    description: "clear sky",
    wind_speed: 10,
    wind_deg: 180,
    wind_gust: 12,
    humidity: 50,
  };

  it("renders correctly", () => {
    const { getByText, getByAltText } = render(<Card {...props} />);

    // const dateText = getByText("Fri Apr 14 2023 (6:00 PM)");
    const tempText = getByText("72°F");
    const descriptionText = getByText("Clear Sky");
    const windSpeedText = getByText("Wind Speed");
    const windAngleText = getByText("Wind Angle");
    const windGustText = getByText("Wind Gust");
    const humidityText = getByText("Humidity");

    const weatherIcon = getByAltText("Weather Icon");

    // expect(dateText).toBeInTheDocument();
    expect(tempText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(windSpeedText).toBeInTheDocument();
    expect(windAngleText).toBeInTheDocument();
    expect(windGustText).toBeInTheDocument();
    expect(humidityText).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute("alt", "Weather Icon");
  });
});
