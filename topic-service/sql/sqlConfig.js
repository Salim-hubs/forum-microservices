// // Configuration de la base de données pour TOPIC-SERVICE
// module.exports = {
//   config:
//   {
//     sqlHost: "127.0.0.1",
//     sqlDatabase: "forum",
//     charset: "utf8",
//     sqlLogin: "root",
//     sqlPassword: ""
//   },
// };


// Configuration de la base de donnees pour TOPIC-SERVICE
  module.exports = {                                                                              
    config:                                                                                       
    {                                                                                             
      sqlHost: process.env.DB_HOST || "127.0.0.1",                                                
      sqlDatabase: process.env.DB_NAME || "forum",                                                
      charset: "utf8",                                                                            
      sqlLogin: process.env.DB_USER || "root",                                                    
      sqlPassword: process.env.DB_PASSWORD || ""                                                  
    },                                                                                            
  };   