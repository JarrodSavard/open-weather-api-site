import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps } from 'next'

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}


const WeatherPage = ({weatherData}: {weatherData: WeatherData}) => {

  //format date from yyy-mm-dd hh:mm:ss to mm/dd/yyyy hh:mm:ss
  const formatDate = (date: string) => {
    const dateArray = date.split(' ')
    const datePart = dateArray[0].split('-')
    const timePart = dateArray[1].split(':')
    return (`${datePart[1]}-${datePart[2]}-${datePart[0]} ${timePart[0]}:${timePart[1]}:${timePart[2]}`)
  }

// capitalize first letter in each word
  const capitalize = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });
  };



  return (
    <>
      <Head>
        <title>Weather: {weatherData?.city.name}</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-4">

      <div className="max-w-2xl w-full p-8 bg-white rounded shadow-md">
        {weatherData ? (
          <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">
          {weatherData.city.name}, {weatherData.city.country}
        </h2>
              </div>
              {console.log(weatherData)}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {weatherData.list.map((data) => (
          <div
            key={data.dt}
            className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center"
          >
            <p className="text-gray-500">{formatDate(data.dt_txt)}</p>
            <div className="flex items-center justify-center mb-4">
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="Weather Icon"
                className="w-16 h-16"
              />
              <p className="text-2xl font-bold ml-4">{data.main.temp}°F</p>
            </div>
            <p className="text-gray-500 text-2xl mb-4">{capitalize(data.weather[0].description)}</p>
            <p>Wind: {data.wind.speed}m/s</p>
            <p>Humidity: {data.main.humidity}%</p>
          </div>
        ))}
      </div>
    </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, lat, lon, units } = query


  if (id) {
    try {
      const response = await axios.post<WeatherData>('http://localhost:3000/api/weather', {
        lat,
        lon,
        units
      })

      const weatherData = response.data

      return {
        props: {
          weatherData,
        },
      }
    } catch (error) {
      console.error(error)

      return {
        notFound: true,
      }
    }
  }

  return {
    notFound: true,
  }
}

export default WeatherPage