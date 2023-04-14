import { render, screen } from "@testing-library/react";
import React from "react";
import WeatherPage, { WeatherData } from "./[id]";
import {expect } from "@jest/globals";

const mockWeatherData: WeatherData = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1617290400,
      main: {
        temp: 23,
        feels_like: 19.89,
        temp_min: 23,
        temp_max: 23,
        pressure: 1015,
        sea_level: 1015,
        grnd_level: 994,
        humidity: 60,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 2.91,
        deg: 283,
        gust: 3.35,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n",
      },
      dt_txt: "2021-04-01 00:00:00",
    },
    // ... more data
  ],
  city: {
    id: 2988507,
    name: "Paris",
    coord: {
      lat: 48.8534,
      lon: 2.3488,
    },
    country: "FR",
    population: 2140526,
    timezone: 7200,
    sunrise: 1617284095,
    sunset: 1617332743,
  },
};

describe("WeatherPage", () => {
  it("displays the city name and country", () => {
    render(<WeatherPage weatherData={mockWeatherData} />);
    expect(screen.getByText("Paris, FR")).toBeInTheDocument();
  });

  it("displays the sunrise and sunset times", () => {
    render(<WeatherPage weatherData={mockWeatherData} />);
    expect(screen.getByText("Sunrise: 6:34 am")).toBeInTheDocument();
    expect(screen.getByText("Sunset: 8:05 pm")).toBeInTheDocument();
  });

  it("displays the current weather data", () => {
    render(<WeatherPage weatherData={mockWeatherData} />);
    expect(screen.getByText("Overcast Clouds")).toBeInTheDocument();
    expect(screen.getByText("23°F")).toBeInTheDocument();
    expect(screen.getByText("Wind Speed")).toBeInTheDocument();
    expect(screen.getByText("Wind Angle")).toBeInTheDocument();
  });
    it("displays the wind speed, angle, and gust values", () => {
  render(<WeatherPage weatherData={mockWeatherData} />);
  expect(screen.getByText("2.91mph")).toBeInTheDocument();
  expect(screen.getByText("283°")).toBeInTheDocument();
  expect(screen.getByText("3.35mph")).toBeInTheDocument();
});

    it("displays the humidity values", () => {
    render(<WeatherPage weatherData={mockWeatherData} />);
    expect(screen.getByText("60%")).toBeInTheDocument();
    });


;
});
