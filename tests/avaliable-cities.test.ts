import { rest } from 'msw';
import { setupServer } from 'msw/node';
import handler, { CityData } from '../pages/api/avaliable-cities';
import { jest, expect } from '@jest/globals';
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const server = setupServer(
  rest.get('http://api.openweathermap.org/geo/1.0/direct', (req, res, ctx) => {
    const city = req.url.searchParams.get('q');
    if (city === 'london') {
      return res(ctx.json({
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
        ],
      }));
    } else {
      return res(ctx.status(404));
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('City API endpoint', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;
  let mockJson: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        city: 'london',
      },
    } as unknown as NextApiRequest;
    mockJson = jest.fn();
    res = {
      status: jest.fn().mockReturnValue({ json: mockJson }),
    } as unknown as NextApiResponse<CityData | Error>;
  });

  it('returns city information from the OpenWeatherMap API', async () => {
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
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
      ],
    });
  });

  it('handles errors gracefully', async () => {
    const errorMessage = {
      name: 'Avaliable Cities API Error',
      message: 'Request failed with status code 404',
    };
    server.use(
      rest.get('http://api.openweathermap.org/geo/1.0/direct', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith(errorMessage);
  });
});
