const resolvers = require('../resolvers');

 describe('[Query.random]', () => {
  const mockContext = {
    dataSources: {
      jokeAPI: { getRandomJoke: jest.fn() },
    },
  };

  it('calls lookup from joke api', async () => {
    const getJoke = mockContext.dataSources.jokeAPI.getRandomJoke;
    getJoke.mockReturnValueOnce(mockJoke);

    // check the resolver response
    const res = await resolvers.Query.random(null, null, mockContext);
    expect(res).toEqual(mockRandomJokeResponse);

    // make sure the dataSources were called properly
    expect(getJoke).toBeCalledWith();
  });
});

describe('[Query.me]', () => {
  const mockContext = {
    dataSources: {
      userAPI: { findOrCreateUser: jest.fn() },
    },
    user: {},
  };

  it('returns null if no user in context', async () => {
    expect(await resolvers.Query.me(null, null, mockContext)).toBeFalsy();
  });

  it('returns user from userAPI', async () => {
    mockContext.user.email = 'a@a.a';
    const findOrCreateUser = mockContext.dataSources.userAPI.findOrCreateUser;
    findOrCreateUser.mockReturnValueOnce({ id: 999 });

    // check return value of resolver
    const res = await resolvers.Query.me(null, null, mockContext);
    expect(res).toEqual({
      id: 999,
    });
  });
});

const mockJoke= {
  categories: [ ],
  created_at: "2016-05-01 10:51:41.584544",
  icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  id: "NpcPeTgZT2KyZ6jRz-mdnw",
  updated_at: "2016-05-01 10:51:41.584544",
  url: "https://api.chucknorris.io/jokes/NpcPeTgZT2KyZ6jRz-mdnw",
  value: "Chuck Norris is so fast that the GPS speaks to him in the past tense."
    };

const jokes=[];
jokes.push(mockJoke);
const mockRandomJokeResponse= {
  success:true,
  message:"random joke fetched!",
  jokes:jokes
}
module.exports.mockRandomJokeResponse= mockRandomJokeResponse;