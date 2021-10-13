var Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "your_pass",
    host: "0.0.0.0",
    port: 5432,
    database: "sensei_pern"
});

module.exports = pool
