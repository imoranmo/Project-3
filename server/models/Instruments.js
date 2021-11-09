const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const instrumentSchema = new Schema({
    instrument: [{
      type: String,
      required: true,
      trim: true
    }]
})

const Instruments = model('Instruments', instrumentSchema)

module.exports = Instruments;
