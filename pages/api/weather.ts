import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios';


interface WeatherData {
  error?: any;
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




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData | Error>
) {

  try {
    const lat: string = req.body.lat
    const lon: string = req.body.lon
    let units: string = req.body.units

    if (!units) {
      units = 'imperial'
    }

    const response: AxiosResponse<WeatherData> = await axios.get<WeatherData>(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPENWEATHER_API_KEY}`);
    const weatherInfo: WeatherData = response.data;
    res.status(200).json(weatherInfo);
  } catch (error: any) {
    const errorMessage: Error = {
      name: "Weather API Error",
      message: error.message,
      };
    res.status(500).json(errorMessage);
  }
}
