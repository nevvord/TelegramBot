const mongoose  = require('mongoose')
const dbName = 'botSale'
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
const conn      = mongoose.createConnection('mongodb://localhost/'+ dbName);

conn.on('connected',    ()    => console.log(`Mongoose connection open to ${dbName} db`));
conn.on('error',        (err) => console.log('Mongoose connection error to botSale db: ' + err));
conn.on('disconnected', ()    => console.log('Mongoose connection disconnected botSale db'));

module.exports = () => {
    console.log('Returning db...')
    return {
      conn,
      users: require('./models/user')(mongoose, conn)
    }
}