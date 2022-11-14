require("dotenv").config();

console.log(process.env.PG_CONNECTION_STRING);
module.exports = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    directory: "./migrations",
  },
};
