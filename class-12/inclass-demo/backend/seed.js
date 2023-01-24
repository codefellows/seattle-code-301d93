'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Cat = require('./models/cat.js');

async function seed() {
  // **name: {type: String, required: true},
  // **color: {type: String, required: true},
  // **spayNeuter: {type: Boolean, required: true},
  // **location: {type: String, required: true}

  await Cat.create({
    name: 'Ronald',
    color: 'Orange Tabby',
    spayNeuter: true,
    location: 'Seattle'
  });

  console.log('Ronald was created!');

  await Cat.create({
    name: 'Karl',
    color: 'Black and White Tabby',
    spayNeuter: true,
    location: 'Rainbow Bridge'
  });

  console.log('Karl was created');

  await Cat.create({
    name: 'Victor',
    color: 'Grey Tabby',
    spayNeuter: true,
    location: 'Rainbow Bridge'
  });
  
  console.log('Victor was created');

  mongoose.disconnect();
}

seed();
