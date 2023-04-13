import React, {useState} from 'react';
import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps } from 'next'
import Image from 'next/image';

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

  //format date to readable format
const formatDate = (date: string, showDate: boolean = true) => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  return showDate ? ` ${dateObj.toDateString()} (${formattedTime})` : formattedTime;
};




// capitalize first letter in each word
  const capitalize = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });
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
              <div
                key={data.dt}
                className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center"
              >
                <p className="text-gray-500">{formatDate(data.dt_txt)}</p>
                <div className="flex items-center justify-center mb-4">
                 <Image
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  alt="Weather Icon"
                  width={64}
                  height={64}
                />
                  <p className="text-2xl font-bold ml-4">{data.main.temp}°F</p>
                </div>
                <p className="text-gray-500 text-2xl mb-4">
                  {capitalize(data.weather[0].description)}
                </p>
                <div className="grid grid-cols-1 w-full text-center md:grid-cols-2 md:w-auto md:text-start gap-2">
                  <div className="bg-gray-300 p-2 rounded-md">
                    <p className="text-sm font-bold">Wind Speed</p>
                    <p className="text-lg">{data.wind.speed}mph</p>
                  </div>
                  <div className="bg-gray-300 p-2 rounded-md">
                    <p className="text-sm font-bold">Wind Angle</p>
                    <p className="text-lg">{data.wind.deg}&deg;</p>
                  </div>
                  <div className="bg-gray-300 p-2 rounded-md">
                    <p className="text-sm font-bold">Wind Gust</p>
                    <p className="text-lg">{data.wind.gust}mph</p>
                  </div>

                  <div className="bg-gray-300 p-2 rounded-md">
                    <p className="text-sm font-bold">Humidity</p>
                    <p className="text-lg">{data.main.humidity}%</p>
                  </div>
                </div>
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
        notFound: true,
      }
    }
  }

  return {
    notFound: true,
  }
}

export default WeatherPage