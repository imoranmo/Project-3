const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const instrumentSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    }
})

const Instrument = model('Instrument', instrumentSchema)

module.exports = Instrument;
