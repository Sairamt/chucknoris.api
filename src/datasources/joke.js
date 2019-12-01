const { RESTDataSource } = require('apollo-datasource-rest');
const UserAPI= require('./user');
class JokeAPI extends RESTDataSource
{
    constructor(){
        super();
        this.baseURL='https://api.chucknorris.io/';
    }

  /*this below function is used for testing
   to mock context object what apollo supplies in runtime */ 
  userAPI(config,store) {
   let api= new UserAPI({store});
   api.initialize(config);
   return api.context;
  } 

async getCategories(){
  if (!this.context || !this.context.user) return false;
    const response =  await this.get('jokes/categories');
    return Array.isArray(response)?response:[];
}
  
async getJokes(){
    const response = await  this.get('jokes');

   return Array.isArray(response)?response.map(joke=>this.jokeReducer(joke)):[];
}

async getRandomJoke(){

  if (!this.context || !this.context.user) return false;
    const response = await this.get('jokes/random');
    return  this.jokeReducer(response) ;
    
}
jokeReducer(joke) {
    return joke;
  }

}
module.exports=JokeAPI;

