const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

console.log("PGPASSWORD:", process.env.PGPASSWORD);
console.log("PGUSER:", process.env.PGUSER);
console.log("PGDATABASE:", process.env.PGDATABASE);
console.log("PGHOST:", process.env.PGHOST);
console.log("PGPORT:", process.env.PGPORT);

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = pool;
