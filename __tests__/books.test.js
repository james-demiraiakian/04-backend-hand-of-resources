const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('01-backend-hand-of-resources books route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('create a new book', async () => {
    const expected = {
      title: 'book',
      author: 'author',
      bookNumber: 1,
      seriesLength: 1,
    };
    const res = await request(app).post('/api/v1/books').send(expected);

    expect(res.body).toEqual({ id: expect.any(Number), ...expected });
  });

  test('fetch all books', async () => {
    const expected = await Book.findAll();
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(expected);
  });

  test('fetch one single book', async () => {
    const expected = await Book.findById(1);
    const res = await request(app).get(`/api/v1/books/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  test('return 404 of try to pass in a counterfeit book', async () => {
    const res = await request(app).get('/api/v1/books/counterfeit-book');

    expect(res.status).toEqual(404);
  });

  test('update a book by id', async () => {
    const expected = {
      id: expect.any(Number),
      title: 'The Witcher: The Last Wish',
      author: 'Andrzej Sapkowski',
      bookNumber: 1,
      seriesLength: 6,
    };
    const res = await request(app)
      .patch('/api/v1/books/1')
      .send({ title: 'The Witcher: The Last Wish' });

    expect(res.body).toEqual(expected);
  });

  test('delete a book', async () => {
    const expected = await Book.findById(1);
    const res = await request(app).delete(`/api/v1/books/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
