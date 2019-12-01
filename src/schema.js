const {gql}=require('apollo-server');

const typeDefs= gql`
type Query {
    jokes ( # replace the current jokes query with this one.
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): JokeConnection!
    random: jokeResponse!
    me: User
    categories: categoryResponse
  }
  
  """
  Simple wrapper around our list of jokles that contains a cursor to the
  last item in the list. Pass this cursor to the jokes query to fetch results
  after these.
  """
  type JokeConnection { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    Jokes: [Joke]!
  }

type Joke {
    id: ID!
    categories: [String]!
    created_at: String!
    updated_at: String
    url: String
    value:String
  }
  
  type User {
    id: ID!
    email: String!
  }
 
  type Mutation {
    
    login(email: String): String # login token
  }
  type jokeResponse {
    success: Boolean!
    message: String
    jokes: [Joke]
  }
  type categoryResponse {
    success: Boolean!
    message: String
    list: [String]
  } 
`;

module.exports = typeDefs;
