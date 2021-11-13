const { Schema, model} = require('mongoose');

const rhythmSchema = new Schema ({
      name: {
        type: String,
        allowNull: false,
        unique:true
      }
  })

const Rhythm = model('Rhythm', rhythmSchema)

module.exports = Rhythm;