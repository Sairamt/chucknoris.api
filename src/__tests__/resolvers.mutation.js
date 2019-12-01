const resolvers = require('../resolvers');

const mockContext = {
  dataSources: {
    userAPI: {
      findOrCreateUser: jest.fn(),
    },
    jokeAPI: {
      getRandomJoke: jest.fn(),
      getCategories: jest.fn(),
    },
  },
  user: { id: 1, email: 'a@a.a' },
};


describe('[Mutation.login]', () => {
  const { findOrCreateUser } = mockContext.dataSources.userAPI;

  it('returns base64 encoded email if successful', async () => {
    const args = { email: 'a@a.a' };
    findOrCreateUser.mockReturnValueOnce(true);
    const base64Email = new Buffer(mockContext.user.email).toString('base64');

    // check the resolver response
    const res = await resolvers.Mutation.login(null, args, mockContext);
    expect(res).toEqual('YUBhLmE=');

    // check if the dataSource was called with correct args
    expect(findOrCreateUser).toBeCalledWith(args);
  });

  it('returns nothing if login fails', async () => {
    const args = { email: 'a@a.a' };
    // simulate failed lookup/creation
    findOrCreateUser.mockReturnValueOnce(false);

    // check the resolver response
    const res = await resolvers.Mutation.login(null, args, mockContext);
    expect(res).toBeFalsy();
  });
});
