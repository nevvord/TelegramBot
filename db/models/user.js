module.exports = (mongoose, conn) => 
  conn.model('users', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chat: { type: String, unique: true },
    links: [{
      id: mongoose.Schema.Types.ObjectId,
      url: String,
      last: String
    }],
    firstName: String,
    lastName: String
  }))