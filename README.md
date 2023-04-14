# OpenWeatherMap API Weather Application

This project is a weather application that uses the OpenWeatherMap API to generate responses for a user's search query. The application includes search debounce to prevent unnecessary API requests, recommendations based on the user's search history, and displays relevant weather information for 5 days.

## Features

-   Search Debounce: The application includes a debounce feature that prevents unnecessary API requests by delaying the search query for a few seconds.

-   Search Recommendations: The application suggests previous searches to users as they type in their query. This feature makes it easier for users to find what they are looking for and helps them avoid spelling mistakes.

-   5-Day Weather Forecast: The application displays the current weather conditions and the forecast for the next five days. Users can see the temperature, wind speed, and humidity for each day.

## Technologies Used

-   **React**: A JavaScript library for building user interfaces.

-   **Next.js**: A framework for building server-side rendered React applications.

-   **OpenWeatherMap API**: A free API for accessing current and forecast weather data.

-   **Axios**: A promise-based HTTP client for making API requests.

## Installation

To run this application on your local machine, follow these steps:

1. Clone the repository:

```
git clone https://github.com/username/open-weather-api-site.git
```

2. Install the dependencies:

```
npm install
```

3. Set up your environment variables:

```
API_KEY=your_api_key_here
```

4. Start the development server:

```
npm run dev
```

5. Open the application in your browser:

```
http://localhost:3000/
```
