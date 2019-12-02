# chucknoris.api
    graphQL api using apollo server

    <h3>Notes for testing </h3>
1) npm start will open the the apollo playground  @ http://localhost:4000
2) we can test following queries and mutations in the playground
    <h3> a) random joke </h3>
        
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
          
  <h3> b) query categories </h3>
      
        
         query getCategories {
            categories {
              success
              message
              list
            }
        }
        
 <h3>  c) mutation login </h3>
       
       mutation LoginUser {
          login(email: "sairam@apollographql.com")
        }
        
       
