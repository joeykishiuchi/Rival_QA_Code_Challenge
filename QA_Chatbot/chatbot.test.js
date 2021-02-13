const supertest = require("supertest");

const host = "https://us-central1-rival-chatbot-challenge.cloudfunctions.net";
const request = supertest(host);

// This is a sample test to help you get started. You can remove it if you would like.
describe('Test the root path', () => {
  it('It should return 302 for the GET method', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toBe(302);
  });
});

describe('Test /challenge-register endpoint', () => {
  it('POST method should return status 400 when provided an empty name or email', async () => {
    await request
      .post('/challenge-register')
      .send({
        name: '',
        email: ''
      })
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('POST method should return a user id when a name and email is provided', async () => {
    const response = await request
      .post('/challenge-register')
      .send({
        name: 'John Doe',
        email: 'John@doe.com'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toMatchObject({
      "user_id": expect.anything(String)
    });
  });
});
// Retrieve registered user id for following tests
let generated_user_id;

beforeAll(async () => {
  const response = await request
    .post('/challenge-register')
    .send({
      name: 'John Doe',
      email: 'John@doe.com'
    })
    .set('Accept', 'application/json');
  
  generated_user_id = response.body.user_id
});

describe('Test /challenge-converation endpoint', () => {
  it('It should return status 400 when an invalid user id is provided', async () => {
    const invalid_user_id = '12345'
    await request
      .post('/challenge-conversation')
      .send({
        "user_id": invalid_user_id
      })
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('It should return a conversation id when a valid user id is provided', async () => {
    const response = await request
      .post('/challenge-conversation')
      .send({
        "user_id": generated_user_id
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toMatchObject({
      "conversation_id": expect.anything(String)
    });
  });
});
// Retrieve registered conversation id for following tests
let generated_conversation_id;

beforeAll(async () => {
  const response = await request
   .post('/challenge-conversation')
   .send({
     "user_id": generated_user_id
   })
   .set('Accept', 'application/json');
 
  generated_conversation_id = response.body.conversation_id
});

describe('Test /challenge-behaviour/<CONVERSATION_ID> endpoint', () => {
  it('GET method should return status 404 when provided with an invalid conversation id', async () => {
    const invalid_conversation_id = '12345';
    await request
      .get(`/challenge-behaviour/${invalid_conversation_id}`)
      .expect(404);
  });

  it('GET method should return an array of messages when provided with a valid conversation id', async () => {
    const response = await request
    .get(`/challenge-behaviour/${generated_conversation_id}`)
    .expect('Content-Type', /json/)
    .expect(200);

    expect(response.body).toMatchObject({
      messages: expect.anything(Array)
    });
  });
  // Initiate conversation with bot
  beforeEach(async () => {
    await request.get(`/challenge-behaviour/${generated_conversation_id}`);
  });

  it('POST method should return status 400 when reply content is empty', async () => {
    await request
      .post(`/challenge-behaviour/${generated_conversation_id}`)
      .send({
        'content': ''
      })
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('POST method should return truthy when the reply content is a correct reponse to the bots message', async () => {
    const response = await request
      .post(`/challenge-behaviour/${generated_conversation_id}`)
      .send({
        'content': 'yes'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.correct).toBeTruthy()
  });

  it('POST method should return falsy when the reply content is an incorrect reponse to the bots message', async () => {
    const response = await request
      .post(`/challenge-behaviour/${generated_conversation_id}`)
      .send({
        'content': 'no'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body.correct).toBeFalsy();
  });
});