const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const rhythmsSchema = new Schema ({
    
  rhythm: 
  {
      name: {
        type: String,
        allowNull: false,
        unique:true
      }
  }
  })


const Rhythm = model('Rhythm', rhythmsSchema)

module.exports = Rhythm;