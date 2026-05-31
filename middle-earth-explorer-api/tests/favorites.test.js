const request = require('supertest');

const app = require('../app');

let token;

beforeEach(async () => {
  await request(app)
    .post('/auth/register')
    .send({
      username: 'legolas',
      email: 'legolas@example.com',
      password: 'password123'
    });

  const login = await request(app)
    .post('/auth/login')
    .send({
      email: 'legolas@example.com',
      password: 'password123'
    });

  token = login.body.token;
});

describe('Favorites Routes', () => {
  test('creates favorite', async () => {
    const response = await request(app)
      .post('/favorites')
      .set(
        'Authorization',
        `Bearer ${token}`
      )
      .send({
        itemType: 'character',
        itemId: '123',
        name: 'Gandalf'
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.name)
      .toBe('Gandalf');
  });

  test('blocks unauthenticated access', async () => {
    const response = await request(app)
      .get('/favorites');

    expect(response.statusCode).toBe(401);
  });
});