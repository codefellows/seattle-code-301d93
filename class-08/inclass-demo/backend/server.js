'use strict';

// *** REQUIRES ***
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

// ** CREATE OUR SERVER ***
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`We are up on port: ${PORT}`));

// *** ENDPOINTS ***
app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my server!');
});

// *** BUILD AN ENDPOINT HIT AN API - USE A CLASS TO GROOM THE BULKY DATA

// *** FOR YOUR LAB - WEATHER
// *** http://api.weatherbit.io/v2.0/forecast/daily?key=<your API key>&lat=<from your frontend>&lon=<from your frontend>&days=5&units=I

// *** FOR YOUR LAB - MOVIES ***
// *** https://api.themoviedb.org/3/search/movie?api_key=<your MOVIE DB KEY>&query=<city info from frontend>
// *** images: https://image.tmdb.org/t/p/w500/<poster path>

app.get('/photos', async (request, response, next) =>{
  try {
    // TODO: accept my queries
    let queryFromFrontEnd = request.query.searchQuery;
    // TODO: use those queries and build out an URL to hit the api
    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${queryFromFrontEnd}`;

    let photoResults = await axios.get(url);

    // TODO: groom that data
    let groomedData = photoResults.data.results.map(picObj => new Photo(picObj));

    // TODO: send that to the front end
    response.status(200).send(groomedData);
  } catch (error) {
    next(error);
  }
});

class Photo {
  constructor(picObj){
    this.src = picObj.urls.regular;
    this.alt = picObj.alt_description;
    this.username = picObj.user.name;
  }
}


// *** CATCH ALL - SHOULD LIVE AT THE BOTTOM ***
app.get('*', (request, response)=> {
  response.status(404).send('This page does not exist');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
