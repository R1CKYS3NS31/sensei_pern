var Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "@S3ns31;",
    host: "0.0.0.0",
    port: 5432,
    database: "sensei_pern"
});

module.exports = pool