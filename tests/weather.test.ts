import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import handler from '../pages/api/weather';
import {jest, expect} from '@jest/globals';

jest.mock('axios');

const mockWeatherData = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1627027200,
      main: {
        temp: 294.42,
        feels_like: 293.26,
        temp_min: 293.82,
        temp_max: 294.42,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1006,
        humidity: 58,
        temp_kf: 0.6,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 1.8,
        deg: 0,
        gust: 3.05,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'd',
      },
      dt_txt: '2021-07-23 12:00:00',
    },
  ],
  city: {
    id: 2643743,
    name: 'London',
    coord: {
      lat: 51.5085,
      lon: -0.1257,
    },
    country: 'GB',
    population: 1000000,
    timezone: 3600,
    sunrise: 1627003989,
    sunset: 1627058708,
  },
};

describe('Weather API endpoint', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;
  let mockJson: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        lat: '51.5085',
        lon: '-0.1257',
      },
    } as NextApiRequest;
    mockJson = jest.fn();
    res = {
      status: jest.fn().mockReturnValue({ json: mockJson }),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns weather information from the OpenWeatherMap API', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockWeatherData,
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockWeatherData);
  });

  it('handles errors gracefully', async () => {
    const mockError = new Error('Failed to fetch weather data');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(mockError);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ name:"Weather API Error",message: 'Failed to fetch weather data' });

  });
});
