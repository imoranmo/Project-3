const db = require('../config/connection');
const { Rhythm, Instrument, Post, User} = require('../models');
const instrumentSeeds = require('./instrumentData.json');
const rhythmSeeds = require('./rhythmData.json');
const userSeeds =  require('./userData.json');
const postSeeds =  require('./postData.json');

db.once('open', async () => {
  try {
    await Rhythm.deleteMany({});
    await Instrument.deleteMany({});

    await Rhythm.create(rhythmSeeds);
    await Instrument.create(instrumentSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, user } = await Post.create(postSeeds[i]);
      await User.findOneAndUpdate(
        { user },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
