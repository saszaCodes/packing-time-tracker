require("dotenv").config();

console.log(process.env.PG_CONNECTION_STRING);
module.exports = {
  development: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: "./migrations",
    },
  },
};
