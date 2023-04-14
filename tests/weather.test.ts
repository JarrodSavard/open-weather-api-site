import { rest } from 'msw';
import { setupServer } from 'msw/node';

import handler, { WeatherData } from '../pages/api/weather';

const server = setupServer(
  rest.get('http://api.openweathermap.org/data/2.5/forecast', (req, res, ctx) => {
    const lat = req.url.searchParams.get('lat');
    const lon = req.url.searchParams.get('lon');
    const units = req.url.searchParams.get('units');

    if (!lat || !lon) {
      return res(ctx.status(400), ctx.json({ message: 'Missing latitude or longitude' }));
    }


    // Return a mock response with sample data
    const data: WeatherData = {
      cod: '200',
      message: 0,
      cnt: 40,
      list: [],
      city: {
        id: 123456,
        name: 'New York',
        coord: {
          lat: 40.7143,
          lon: -74.006,
        },
        country: 'US',
        population: 0,
        timezone: -14400,
        sunrise: 1647513888,
        sunset: 1647559268,
      },
    };
    return res(ctx.status(200), ctx.json(data));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('handler', () => {
  it('should return weather data', async () => {
    const req = { body: { lat: '40.7143', lon: '-74.006' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      cod: '200',
      message: 0,
      cnt: 40,
      list: [],
      city: {
        id: 123456,
        name: 'New York',
        coord: {
          lat: 40.7143,
          lon: -74.006,
        },
        country: 'US',
        population: 0,
        timezone: -14400,
        sunrise: 1647513888,
        sunset: 1647559268,
      },
    });
  });

  it('should return an error for missing latitude or longitude', async () => {
    const req = { url: new URL('http://api.openweathermap.org/data/2.5/forecast?units=imperial'), body: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await handler(req as any, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({name: "Weather API Error", message: 'Missing latitude or longitude' });
  });

});
