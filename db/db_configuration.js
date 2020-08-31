// require pg pool
const {Pool} = require('pg');
const pool = new Pool({
    user:process.env.DATA_USER,
    host:process.env.DATA_HOST, /*verify with command " \conninfo" in psql repl*/
    database: process.env.DATA_DATABASE,
    password: process.env.DATA_PASS,
    port: process.env.DATA_PORT
  
})
 module.exports = pool;