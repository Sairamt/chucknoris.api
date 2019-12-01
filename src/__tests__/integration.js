const { createTestClient } = require('apollo-server-testing');
const gql = require('graphql-tag');
const nock = require('nock');

const { constructTestServer } = require('./__utils');

// the mocked REST API data
// the mocked SQL DataSource store
const { mockStore,mockJokeResponse } = require('../datasources/__tests__/joke');
const GET_JOKE = gql`
query getRandomJokes {
  random { 
      success
      message
      jokes{
        id      	      
      	value
      }
    } 
}
`;
const LOGIN = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

describe('Queries', () => {
  it('fetches random  joke', async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    // This function returns the server instance as well as our dataSource
    // instances, so we can overwrite the underlying fetchers
    const { server, jokeAPI, userAPI } = constructTestServer({
      context: () => ({ user: { id: 1, email: 'a@a.a' } }),
    });

    // mock the datasources' underlying fetch methods, whether that's a REST
    // lookup in the RESTDataSource or the store query in the Sequelize datasource
    jokeAPI.get = jest.fn(() => mockJokeResponse);
    userAPI.store = mockStore;
        // use our test server as input to the createTestClient fn
    // This will give us an interface, similar to apolloClient.query
    // to run queries against our instance of ApolloServer
    const { query } = createTestClient(server);
    const res = await query({ query: GET_JOKE });
    expect(res).toMatchSnapshot();
  });
});


describe('Mutations', () => {
  it('returns login token', async () => {
    const { server, jokeAPI, userAPI } = constructTestServer({
      context: () => {},
    });

    userAPI.store = mockStore;
    userAPI.store.users.findOrCreate.mockReturnValueOnce([
      { id: 1, email: 'a@a.a' },
    ]);

    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: LOGIN,
      variables: { email: 'a@a.a' },
    });
    expect(res.data.login).toEqual('YUBhLmE=');
  });
});

