module.exports = (mongoose, conn) => conn.model('User', new mongoose.Schema({
    chatID : { type : String, unique : true},
    links : { type : Array}
  }));
  