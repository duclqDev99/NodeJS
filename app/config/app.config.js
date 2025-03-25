require('dotenv').config() 

const dbConfig = {
    port: process.env.PORT,
}

module.exports = dbConfig;