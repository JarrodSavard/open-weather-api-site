// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios';

interface CityData {
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
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CityData>
) {

    try {
    const city:string  = req.body.city
    const response: AxiosResponse<CityData> = await axios.get<CityData>(`http://api.openweathermap.org/geo/1.0/direct?q=${city.trim().toLowerCase()}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`);
    const avaliableCities: CityData = response.data;
    console.log(avaliableCities);
    res.status(200).json( avaliableCities )
  }
  catch (error) {
    console.error(error)
  }

}
