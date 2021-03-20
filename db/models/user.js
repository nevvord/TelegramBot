module.exports = (mongoose, conn) => 
  conn.model('users', new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chat: { type: String, unique: true },
    status: { type: String, default: 'default' },
    limit: { type: Number, default: 2 },
    usage: { type: Number, default: 0 },
    links: [{
      id: mongoose.Schema.Types.ObjectId,
      url: String,
      last: Array,
      fail: { type: Number, default: 0 }
    }],
    firstName: String,
    lastName: String
  }))