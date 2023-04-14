import React from 'react'
import Image from 'next/image'
import { capitalize } from '@/utils/capitalize'
import { formatDate } from '@/utils/formatDate'

interface Props{
    dt_text: string;
    icon: string;
    temp: number;
    description: string;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    humidity: number;
}

export const Card = ({dt_text, icon, temp, description, wind_speed, wind_deg, wind_gust, humidity}: Props) => {




  return (
      <div
                className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center"
              >
                <p className="text-gray-500">{formatDate(dt_text)}</p>
                <div className="flex items-center justify-center mb-4">
                 <Image
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  alt="Weather Icon"
                  width={64}
                  height={64}
                />
                  <p className="text-2xl font-bold ml-4">{temp}°F</p>
                </div>
                <p className="text-gray-500 text-2xl mb-4">
                  {capitalize(description)}
                </p>
                <div className="grid grid-cols-1 w-full text-center md:grid-cols-2 md:w-auto md:text-start gap-2">
                  <div className="bg-gray-300 p-2 rounded-md">
                    <p className="text-sm font-bold">Wind Speed</p>
                    <p className="text-lg">{wind_speed}mph</p>
                  </div>
                  <div className="bg-gray-300 p-2 rounded-md">
                    <p className="text-sm font-bold">Wind Angle</p>
                    <p className="text-lg">{wind_deg}&deg;</p>
                  </div>
                  <div className="bg-gray-300 p-2 rounded-md">
                    <p className="text-sm font-bold">Wind Gust</p>
                    <p className="text-lg">{wind_gust}mph</p>
                  </div>

                  <div className="bg-gray-300 p-2 rounded-md">
                    <p className="text-sm font-bold">Humidity</p>
                    <p className="text-lg">{humidity}%</p>
                  </div>
                </div>
              </div>
  )
}
