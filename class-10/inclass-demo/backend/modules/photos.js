'use strict';

const axios = require('axios');

let cache = {};

// TODO: need to create a key for the data i'm going store
// TODO: if the thing exist AND in a valid timeframe ... send that data
// TODO: if the thing DOES NOT exist - call API and cache what is returned from my API

async function getPhotos(request, response, next) {
  try {

    let queryFromFrontEnd = request.query.searchQuery;

    // **** CREATE MY KEY *****
    let key = `${queryFromFrontEnd}Photo`; // ** key = kittenPhoto  cache[kittenPhoto]

    // **** IF IT EXISTS AND IT IS IN A VALID TIME - SEND THAT DATA
    if(cache[key] && (Date.now() - cache[key].timeStamp) < 10000){

      console.log('Cache was hit, images are present');
      response.status(200).send(cache[key].data);

    } else {

      console.log('cache missed -- no images present');

      let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${queryFromFrontEnd}`;
      let photoResults = await axios.get(url);
      let groomedData = photoResults.data.results.map(picObj => new Photo(picObj));

      // **** Cache the results from the api call
      cache[key] = {
        data: groomedData,
        timeStamp: Date.now()
      };
      response.status(200).send(groomedData);
    }

  } catch (error) {
    next(error);
  }
}

class Photo {
  constructor(picObj) {
    this.src = picObj.urls.regular;
    this.alt = picObj.alt_description;
    this.username = picObj.user.name;
  }
}


module.exports = getPhotos;
