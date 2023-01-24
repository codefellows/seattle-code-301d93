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

// ! DON'T FORGET TO USE THIS!!! - MIDDLEWARE TO PARSE JSON DATA FROM THE REQUEST.BODY
app.use(express.json());

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
    let allCats = await Cat.find({});

    response.status(200).send(allCats);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// **** ENDPOINT TO DELETE A CAT ******
// ! we must have a path parameter
// ! we will use a variable to capture the ID
// ! to create the variable we use the ':' and add a variable name
app.delete('/cats/:catID', deleteCats);


async function deleteCats(request,response,next){
  try {
    let id = request.params.catID;

    await Cat.findByIdAndDelete(id);

    response.status(200).send('Cat Deleted');
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


// **** ENDPOINT TO ADD A CAT *****
app.post('/cats', postCat);

async function postCat(request,response,next){
  try {

    let createdCat = await Cat.create(request.body);
    // !!! DON'T FORGET THAT MIDDLEWARE ^ ^ ^ ^(line 32)

    response.status(200).send(createdCat);
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
