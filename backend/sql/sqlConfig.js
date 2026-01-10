// This file is used to config database connection,
// by initializing some variables.
// It is required in the sqlConnect.js file.

module.exports = { 
  // config contains what is needed to connect to the database.   
  config:
  {
    sqlHost: "127.0.0.1",
    sqlDatabase: "forum",
    charset: "utf8",
    sqlLogin: "root",
    sqlPassword: ""
  },
};