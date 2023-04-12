import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';

export const SearchBar = () => {
     interface CityData {
      name: string;
      local_names?: {
        [key: string]: string;
      };
      lat: number;
      lon: number;
      country: string;
      state?: string;
      }[]

  const [query, setQuery] = useState('')
  const [timer, setTimer] = useState<number | null>(null)
  const [availableCities, setAvailableCities] = useState<CityData[]>([])
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (query.trim().length === 0) {
      router.push("/")
    }
    router.push(`/weather/${query.trim().toLowerCase()}`)
    setQuery('')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setQuery(inputValue)

    // Clear the previous timer
    if (timer) {
      window.clearTimeout(timer)
    }


    // Start a new timer
    const newTimer = window.setTimeout(() => {
      if (inputValue.trim().length === 0) {
        setAvailableCities([])
        return
      }

      axios.post(`http://localhost:3000/api/avaliable-cities`, {
        city: inputValue.trim().toLowerCase(),
      })
        .then((response) => {
          console.log(response.data)
          setAvailableCities(response.data);
        })

    }, 500)

    setTimer(newTimer)
  }

  return (
    <div className="flex flex-col items-center justify-start pt-24 w-screen shadow-md pb-24 ">

      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <h1 className='text-black mb-2'>Enter a city name below to get the current weather:</h1>
        <div className="flex items-center border p-4 rounded-md border-gray-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter a city"
            value={query}
            onChange={handleInputChange}
          />
          <button
            className="flex-shrink-0 font-semibold text-md bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700  border-4 text-white py-1 px-4 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      {
        availableCities.length > 0 && (
          <div className="mt-4">
            <h2 className="text-black">Available Cities:</h2>
            <ul className="list-disc list-inside">

              {
                  availableCities.map((city, i) => (
                    <li key={i} className="text-black">{city.name}, {city.state} - {city.country}</li>
                  )
                )
              }
            </ul>
          </div>

        )
      }
    </div>
  )

}
