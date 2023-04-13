import axios from 'axios';
import handler, {CityData} from './avaliable-cities';
import { jest, expect } from '@jest/globals';
import type { NextApiRequest, NextApiResponse } from 'next'



jest.mock('axios');

const mockCityData: CityData = {
  city: [
    {
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
    {
      id: 5128581,
      name: 'New York',
      coord: {
        lat: 40.7143,
        lon: -74.006,
      },
      country: 'US',
      population: 10000000,
      timezone: -14400,
      sunrise: 1626983228,
      sunset: 1627035912,
    },
  ],
};

describe('City API endpoint', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;
  let mockJson: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        city: 'london',
      },
    } as NextApiRequest;
    mockJson = jest.fn();
    res = {
      status: jest.fn().mockReturnValue({ json: mockJson }),
    } as unknown as NextApiResponse<CityData>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns city information from the OpenWeatherMap API', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockCityData,
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockCityData);
  });

  it('handles errors gracefully', async () => {
    const mockError = new Error('Failed to fetch city data');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(mockError);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({name:"Avaliable Cities API Error", message: 'Failed to fetch city data' });

  });
});
