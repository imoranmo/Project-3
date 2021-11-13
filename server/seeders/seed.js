const db = require('../config/connection');
const { Rhythm, Instrument, Post, User} = require('../models');
const instrumentSeeds = require('./instrumentData.json');
const rhythmSeeds = require('./rhythmData.json');

db.once('open', async () => {
  try {
    await Rhythm.deleteMany({});
    await Instrument.deleteMany({});

    await Rhythm.create(rhythmSeeds);
    await Instrument.create(instrumentSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
