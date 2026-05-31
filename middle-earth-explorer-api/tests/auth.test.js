const request = require('supertest');

const app = require('../app');

describe('Auth Routes', () => {
  test('registers a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        username: 'frodo',
        email: 'frodo@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.username)
      .toBe('frodo');
  });

  test('prevents duplicate email', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        username: 'frodo',
        email: 'frodo@example.com',
        password: 'password123'
      });

    const response = await request(app)
      .post('/auth/register')
      .send({
        username: 'sam',
        email: 'frodo@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(400);
  });

  test('logs in successfully', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        username: 'aragorn',
        email: 'aragorn@example.com',
        password: 'password123'
      });

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'aragorn@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.token)
      .toBeDefined();
  });
});