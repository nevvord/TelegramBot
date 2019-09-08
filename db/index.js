const mongoose  = require('mongoose');
const conn      = mongoose.createConnection('mongodb://localhost/botSale', {});

conn.on('connected',    ()    => console.log('Mongoose connection open to test2 db'));
conn.on('error',        (err) => console.log('Mongoose connection error to test2 db: ' + err));
conn.on('disconnected', ()    => console.log('Mongoose connection disconnected test2 db'));

module.exports = () => {
    console.log('Returning db...');
  
    return {
      conn,
      User : require('./models/user')(mongoose, conn)
    };
  
  };