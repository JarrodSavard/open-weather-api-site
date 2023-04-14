import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "./index";
import {expect }from "@jest/globals";

describe("Home", () => {
  it("renders the header text", () => {
    render(<Home />);
    expect(screen.getByText("Verify Test Application")).toBeInTheDocument();
  });

  it("renders the feature list", () => {
    render(<Home />);
    expect(screen.getByText("Real-time weather data for any city")).toBeInTheDocument();
    expect(screen.getByText("Displays temperature, humidity, pressure, and more")).toBeInTheDocument();
    expect(screen.getByText("Simple and easy to use interface")).toBeInTheDocument();
  });

  it("renders the how it works list", () => {
    render(<Home />);
    expect(screen.getByText("Enter the name of a city in the search bar on the home page")).toBeInTheDocument();
    expect(screen.getByText('Click on the "Search" button')).toBeInTheDocument();
    expect(screen.getByText("The site will display the current weather information for the city")).toBeInTheDocument();
  });

  it("renders the welcome text", () => {
    render(<Home />);
    expect(screen.getByText("Welcome to the Verify Test Application! This site allows you to get current weather information for any city around the world using the OpenWeatherAPI.")).toBeInTheDocument();
});
it("renders how it works text", () => {
    render(<Home />);
    expect(screen.getByText("Here's how it works:")).toBeInTheDocument();
    })

  it("renders the try it out text", () => {
    render(<Home />);
    expect(screen.getByText("Give it a try and see the weather for your favorite city!")).toBeInTheDocument();
  });
});
