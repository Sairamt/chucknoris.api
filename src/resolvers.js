module.exports = {
  Query: {

    random: async (_, __, { dataSources }) => {
      const jokes= [];
      const joke = await dataSources.jokeAPI.getRandomJoke();
      
      if(!joke){
        return {
          success:false,
          message:"user not authorized",
          jokes:[]
        }
      }
      
      jokes.push(joke);
      return {
          success:Array.isArray(jokes),
          message:"random joke fetched!",
          jokes
      };
       
    },
    me: async   (_, __, { dataSources }) => 
      dataSources.userAPI.findOrCreateUser(),
    categories: async (_,__,{dataSources}) =>{
    
    const results= await dataSources.jokeAPI.getCategories()

    if(!results){
      return {
        success:false,
        message:"user not authorized",
        list:[]
      };
    }
  return {
        success:Array.isArray(results),
        message:"categories fetched!",
        list: Array.isArray(results)?results:[]
    };
  }
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return Buffer.from(email).toString('base64');
    },
  }
  }