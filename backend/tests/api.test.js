const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  it('should return 200 for the root path (serving frontend)', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });

  it('should have security headers (Helmet)', async () => {
    const res = await request(app).get('/');
    expect(res.headers['x-content-type-options']).toEqual('nosniff');
    expect(res.headers['x-frame-options']).toEqual('SAMEORIGIN');
  });

  it('should return 404 for non-existent API routes', async () => {
    const res = await request(app).get('/api/non-existent');
    expect(res.statusCode).toEqual(404);
  });
});
