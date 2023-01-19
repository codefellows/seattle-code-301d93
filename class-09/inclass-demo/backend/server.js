'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getPhotos = require('./modules/photos.js');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`We are up on port: ${PORT}`));


app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my server!');
});
app.get('/photos', getPhotos);

// *** CATCH ALL - SHOULD LIVE AT THE BOTTOM ***
app.get('*', (request, response)=> {
  response.status(404).send('This page does not exist');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
