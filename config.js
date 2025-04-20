require('dotenv').config();

//creado para pagosflow.js

const config = {
  apiKey: process.env.APIKEY,
  secretKey: process.env.SECRETKEY,
  apiUrl: process.env.APIURL,
  baseUrl: process.env.BASEURL,
};

module.exports = config;