const JokeAPI = require('../joke');
const UserAPI = require('../user');

const mockStore = {
  users: {
    findOrCreate: jest.fn(),
    findAll: jest.fn(),
  }
};
module.exports.mockStore = mockStore;
const ds = new JokeAPI();
ds['context']=ds.userAPI({ context: { user: { id: 1, email: 'a@a.a' } }}, mockStore );

/**
 * There are mock Jokes at the bottom of this file.
 * 1 mock for the RAW API reponse, and another
 * for the shape of the lauch after it would have been
 * transformed by the joke reducer.
 */

const mocks = {
  get: jest.fn(),
};

ds.get = mocks.get;

describe('[JokeAPI.jokeReducer]', () => {
  it('properly transforms joke', () => {
    expect(ds.jokeReducer(mockJokeResponse)).toEqual(mockJoke);
  });
});


describe('[JokeAPI.getRandomJoke]', () => {
  it('should look up random joke from api', async () => {
    // if api response is list of raw jokees,
    // res should be single transformed joke
    mocks.get.mockReturnValueOnce(mockJokeResponse);
    const res = await ds.getRandomJoke();

    expect(res).toEqual(mockJoke);
  });
});
/**
 * MOCK DATA BELOW
 */

// properly transformed joke
const mockJoke = {
categories: [ ],
created_at: "2016-05-01 10:51:41.584544",
icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
id: "NpcPeTgZT2KyZ6jRz-mdnw",
updated_at: "2016-05-01 10:51:41.584544",
url: "https://api.chucknorris.io/jokes/NpcPeTgZT2KyZ6jRz-mdnw",
value: "Chuck Norris is so fast that the GPS speaks to him in the past tense."
}

// raw joke response from API
const mockJokeResponse = {
  categories: [ ],
  created_at: "2016-05-01 10:51:41.584544",
  icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  id: "NpcPeTgZT2KyZ6jRz-mdnw",
  updated_at: "2016-05-01 10:51:41.584544",
  url: "https://api.chucknorris.io/jokes/NpcPeTgZT2KyZ6jRz-mdnw",
  value: "Chuck Norris is so fast that the GPS speaks to him in the past tense."
  };


module.exports.mockJokeResponse = mockJokeResponse;
