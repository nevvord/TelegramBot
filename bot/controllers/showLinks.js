module.exports = async (msg, match) => {
  try {
    const user = await db.users.findOne({ chat: msg.from.id })
    if (!user) return bot.sendMessage(msg.from.id, 'Пользователь не найден')
    if (!user.links || user.links.length == 0) return bot.sendMessage(user.chat, 'У вас не ссылок')
    user.links.forEach((link, index) => {
      const reply_markup = {
        inline_keyboard: [
          [{
            text: 'Удалить',
            callback_data: `{ "_id": "${link._id}" }`
          }]
        ]       
      }
      bot.sendMessage(msg.from.id, link.url, { reply_markup })
    })
  } catch (error) {
    console.error(error)
    bot.sendMessage(msg.from.id, 'Что-то пошло не так')
  }
}