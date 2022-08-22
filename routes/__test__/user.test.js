const app = require('../../app');

const request = require('supertest');

describe('Get list of free slots', () =>  {

  it('should return 400 OK as the userId pram is not passed', async () => {
    const res = await request(app)
      .get('/api/meetingSlots')
      .send();
    expect(res.statusCode).toBe(400);
  })
})
