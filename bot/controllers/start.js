const { Types } = require('mongoose')
module.exports = async (msg, match) => {
  const keyboard = [
    ['Добавить ссылку'],
    ['Мои ссылки', 'Контакты']
  ]

  const options = {
    reply_markup: {
      resize_keyboard: true,
      keyboard
    }
  }
  try {
    const findUser = await db.users.findOne({ chat: msg.from.id })
    if (!findUser) {
      const user = new db.users({
        _id: Types.ObjectId(),
        chat: msg.from.id,
        firstName: msg.from.first_name,
        lastName: msg.from.last_name
      })
      await user.save()
      bot.sendMessage(user.chat, 'Регистрация успешна', options)
    } else {
      bot.sendMessage(msg.from.id, 'Добро пожаловать', options)
    }
  } catch (error) {
    bot.sendMessage(msg.from.id, 'Что-то пошло не так')
    console.error(error)
  }
}