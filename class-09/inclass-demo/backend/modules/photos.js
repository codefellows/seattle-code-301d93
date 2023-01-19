'use strict';

const axios = require('axios');


// ! EXAMPLE BELOW IS NOT NEED FOR TODAY'S LAB BUT FUN TO SEE DIFFERENT REFACTORS

// function getPhotosWithChaining(request, response, next) {

//   let queryFromFrontEnd = request.query.searchQuery;

//   let baseURL = 'https://api.unsplash.com/search/photos';
//   let queryStrings = {
//     client_id: process.env.UNSPLASH_API_KEY,
//     query: queryFromFrontEnd,
//   };

//   axios.get(baseURL, { params: queryStrings })
//     .then(photoResults => photoResults.data.results.map(picObj => new Photo(picObj)))
//     .then(groomedData => response.status(200).send(groomedData))
//     .catch(error => next(error));
// }




async function getPhotos(request, response, next) {
  try {

    let queryFromFrontEnd = request.query.searchQuery;
    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${queryFromFrontEnd}`;
    let photoResults = await axios.get(url);
    let groomedData = photoResults.data.results.map(picObj => new Photo(picObj));

    response.status(200).send(groomedData);
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
