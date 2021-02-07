module.exports = async (msg, match) => {
  console.log(msg.text.split('/').length)
  if (!msg.text.includes('/q-') && msg.text.split('/').length < 7)
    return bot.sendMessage(msg.from.id, 'Невереный форма сслылки, добавте ссылку с поисковой страницы olx')
  try {
    const user = await db.users.findOne({ chat: msg.from.id })
    const url = msg.text.replace(/m./, '')
    user.links.push({ url })
    await user.save()
    bot.sendMessage(user.chat, 'Ссылка добавлена успешено')
  } catch (error) {
    bot.sendMessage(msg.from.id, 'Не удалось добавить ссылку')
    console.error(error)
  }
}