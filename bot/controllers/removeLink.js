module.exports = async query => {
  if (query.from.is_bot) return bot.sendMessage(query.from.id, 'Отвали бот')
  try {
    const data = JSON.parse(query.data)
    if (!data) return bot.sendMessage(query.from.id, 'data required')
    const user = await db.users.findOne({ chat: query.from.id })
    console.log(user.links[0]._id, data._id, user.links[0]._id != data._id)
    user.links = user.links.filter(link => link._id != data._id)
    await user.save()
    bot.sendMessage(query.from.id, 'Ссылка удалена')
  } catch (error) {
    console.error(error)
    bot.sendMessage(query.from.id, 'Что-то пошло не так')
  }
}