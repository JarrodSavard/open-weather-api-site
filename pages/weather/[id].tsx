import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
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

  return (
    <>
      <Head>
        <title>Weather: {weatherData?.city.name}</title>
      </Head>
    <div className='w-full text-center mt-10'>
      {weatherData ?
        <div>
          <h1>{weatherData.city.name}</h1>
          <p>Temperature: {weatherData.list[0].main.temp}°F</p>
          <p>Description: {weatherData.city.population}</p>
        </div> :
        <p>Loading...</p>
      }
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