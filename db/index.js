const mongoose  = require('mongoose');
const dbName = 'botSale';
const conn      = mongoose.createConnection('mongodb://localhost/'+ dbName, {useNewUrlParser: true});

conn.on('connected',    ()    => console.log(`Mongoose connection open to ${dbName} db`));
conn.on('error',        (err) => console.log('Mongoose connection error to botSale db: ' + err));
conn.on('disconnected', ()    => console.log('Mongoose connection disconnected botSale db'));

module.exports = () => {
    console.log('Returning db...');
  
    return {
      conn,
      User : require('./models/user')(mongoose, conn)
    };
};