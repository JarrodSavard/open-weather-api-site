import React, {useState} from 'react';
import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps } from 'next'
import { Card } from '@/components/Card';
import { formatDate } from '@/utils/formatDate';
export interface WeatherData {
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


  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 6; // Change this to set the number of items per page

  // Calculate the index of the first and last item on the current page
  const lastIndex: number = currentPage * itemsPerPage;
  const firstIndex: number = lastIndex - itemsPerPage;

  // Get the current page of items
  const currentItems: WeatherData['list'] = weatherData?.list.slice(firstIndex, lastIndex) || [];

  const totalPages: number = Math.ceil((weatherData?.list.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>5 Day Forecast</title>
      </Head>
      <div className="flex justify-center items-center py-10 bg-gray-100">

      <div className="max-w-5xl w-full p-8 bg-white rounded shadow-md">
        {weatherData ? (
           <>
              <div className="text-center mb-8">
                <div>

                </div>
            <h2 className="text-2xl font-bold">
                  {weatherData.city.name}, {weatherData.city.country}
                </h2>
                <div className='max-w-xs m-auto my-2 grid grid-cols-2'>
            <p className="text-lg">
              Sunrise: {formatDate(new Date(weatherData.city.sunrise * 1000).toISOString(), false)}
            </p>
            <p className="text-lg">
              Sunset: {formatDate(new Date(weatherData.city.sunset * 1000).toISOString(), false)}
            </p>
                </div>

          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
                {currentItems.map((data) => (
                  <div key = {data.dt}>
                    <Card
                      dt_text={data.dt_txt}
                      icon={data.weather[0].icon}
                      temp={data.main.temp}
                      description={data.weather[0].description}
                      wind_speed={data.wind.speed}
                      wind_deg={data.wind.deg}
                      wind_gust={data.wind.gust}
                      humidity={data.main.humidity} />
              </div>

            ))}
          </div>
         <div className="flex justify-center mt-8">
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
    <button
      key={pageNumber}
      className={`mx-2 px-2 py-1 rounded-lg text-sm sm:px-4 sm:py-3 ${
        pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
      }`}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
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
      const response = await axios.post<WeatherData>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/weather`, {
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
        props: {
          weatherData: false,
        }
      }
    }
  }

  return {
    props: {
          weatherData: false,
        }
  }
}

export default WeatherPage