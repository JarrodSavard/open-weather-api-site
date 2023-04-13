import { render, fireEvent, screen } from '@testing-library/react'
import axios from 'axios'
import { SearchBar } from './SearchBar'

jest.mock('axios')

describe('SearchBar component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

//   test('renders correctly', () => {
//     render(<SearchBar />)

//     expect(screen.getByPlaceholderText('Enter a city')).toBeInTheDocument()
//     expect(screen.getByText('Search')).toBeInTheDocument()
//   })

  test('submits form with query and available cities', async () => {
    const mockRouterPush = jest.fn()
    const mockAvailableCities = [
      {
        name: 'Los Angeles',
        state: 'California',
        country: 'US',
        lat: 34.0522,
        lon: -118.2437,
      },
      {
        name: 'Lagos',
        country: 'NG',
        lat: 6.5244,
        lon: 3.3792,
      },
    ]

    jest.spyOn(axios, 'post').mockResolvedValue({ data: mockAvailableCities })

    jest.mock('next/router', () => ({
      useRouter: () => ({
        push: mockRouterPush,
      }),
    }))

    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Enter a city')
    const form = screen.getByRole('form')
    fireEvent.change(input, { target: { value: 'los' } })
    fireEvent.submit(form)

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/avaliable-cities', {
      city: 'los',
    })

    await screen.findByText('Available Cities:')
    expect(screen.getByText('Los Angeles, California - US')).toBeInTheDocument()
    expect(screen.getByText('Lagos - NG')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Los Angeles, California - US'))

    expect(mockRouterPush).toHaveBeenCalledWith('/weather/los%20angeles?lat=34.0522&lon=-118.2437')
  })

  test('submits form without query or available cities', async () => {
    const mockRouterPush = jest.fn()

    jest.mock('next/router', () => ({
      useRouter: () => ({
        push: mockRouterPush,
      }),
    }))

    render(<SearchBar />)

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(mockRouterPush).toHaveBeenCalledWith('/')
  })
})