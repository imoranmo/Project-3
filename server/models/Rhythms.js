const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const rhythmsSchema = new Schema ({
    
  rhythms: 
  [{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rhythm: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      }
  }]
  })


const Rhythms = model('Rhythms', rhythmsSchema)

module.exports = Rhythms;