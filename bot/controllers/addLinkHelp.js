const fs = require('fs')
module.exports = async (msg, match) => {
  try {
    bot.sendMessage(msg.from.id, 'Отправте боту ссылку на страницу поиска')
    bot.sendVideo(msg.from.id, 'static/video.mp4')
  } catch (error) {
    console.error(error)
  }
}