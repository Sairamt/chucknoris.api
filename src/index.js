const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const JokeAPI = require('./datasources/joke');
const UserAPI = require('./datasources/user');
const resolvers=require('./resolvers');
const isEmail = require('isemail');

const store=createStore();

const dataSources = () => ({
    jokeAPI: new JokeAPI(),
    userAPI: new UserAPI({ store }),
  });
  
const server = new ApolloServer(
    {
      context: async ({ req }) => {
        // simple auth check on every request
        const auth = req.headers && req.headers.authorization || '';
        const email = Buffer.from(auth, 'base64').toString('ascii');
        if (!isEmail.validate(email)) return { user: null };
        // find a user by their email
        const users = await store.users.findOrCreate({ where: { email } });
        const user = users && users[0] || null;
    
        return { user: { ...user.dataValues } };
      },
     typeDefs,
     resolvers,
     dataSources: ()=> ({
        jokeAPI: new JokeAPI(),
        userAPI: new UserAPI({ store })
      })
      
    });
       
server.listen().then(({url})=>{
    console.log(`🚀 Server ready at ${url}`);

});
// export all the important pieces for integration/e2e tests to use
module.exports = {
    dataSources,
    typeDefs,
    resolvers,
    ApolloServer,
    JokeAPI,
    UserAPI,
    store,
    server,
  };