// require pg pool
const {Pool} = require('pg');
const pool = new Pool({
    user:process.env.DATA_USER1,
    host:process.env.DATA_HOST1, /*verify with command " \conninfo" in psql repl*/
    database: process.env.DATA_DATABASE1,
    password: process.env.DATA_PASS1,
    port: process.env.DATA_PORT1
  
})
 module.exports = pool;