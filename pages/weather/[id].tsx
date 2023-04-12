import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


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


const WeatherPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (id) {
      console.log(id);
      axios.post<WeatherData>(`http://localhost:3000/api/weather`, {
        "lat": "33.8358492",
        "lon": "-118.3406288",
        units: "celsius",
      })
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  return (
    <div className='w-full text-center mt-10'>
      {weatherData ?
        <div>
          <h1>{weatherData.city.name}</h1>
          <p>Temperature: {weatherData.list[0].main.temp}°{"celsius" == "celsius" ? "C" : "F"}</p>
          <p>Description: {weatherData.city.population}</p>
        </div> :
        <p>Loading...</p>
      }
    </div>
  );
}

export default WeatherPage