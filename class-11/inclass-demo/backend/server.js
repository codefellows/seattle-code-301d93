'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// **** REQUIRE IN OUR MODEL *****

const Cat = require('./models/cat.js');

// *** BRING IN MONGOOSE ***
const mongoose = require('mongoose');

// *** PER MONGOOSE DOCS PLUG AND PLAY CODE ****
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// *******************************

const app = express();

// middleware
app.use(cors());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// ENDPOINT
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});


// ***** ENDPOINT TO GET ALL THE CATS FROM MY DATABASE *****

app.get('/cats', getCats);

async function getCats(request, response, next){
  try {
    let allCats = await Cat.find({}); // Model.find({}) - gets all the docs from the database

    response.status(200).send(allCats);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
