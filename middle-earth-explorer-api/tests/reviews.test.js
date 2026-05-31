const request = require('supertest');

const app = require('../app');

let token;

beforeEach(async () => {
  await request(app)
    .post('/auth/register')
    .send({
      username: 'gimli',
      email: 'gimli@example.com',
      password: 'password123'
    });

  const login = await request(app)
    .post('/auth/login')
    .send({
      email: 'gimli@example.com',
      password: 'password123'
    });

  token = login.body.token;
});

describe('Reviews Routes', () => {
  test('creates review', async () => {
    const response = await request(app)
      .post('/reviews')
      .set(
        'Authorization',
        `Bearer ${token}`
      )
      .send({
        title: 'Great Character',
        content: 'Samwise is amazing',
        rating: 5
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.rating)
      .toBe(5);
  });

  test('searches reviews', async () => {
    await request(app)
      .post('/reviews')
      .set(
        'Authorization',
        `Bearer ${token}`
      )
      .send({
        title: 'Samwise Review',
        content: 'Best character',
        rating: 5
      });

    const response = await request(app)
      .get('/reviews/search?q=Samwise');

    expect(response.statusCode).toBe(200);

    expect(response.body.length)
      .toBeGreaterThan(0);
  });
});