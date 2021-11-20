const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/alottarhythms',
  // process.env.MONGODB_URI || 'mongodb+srv://lukeajcole:LuketheDBA@cluster0.oj9l9.mongodb.net/alottarhythms?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
