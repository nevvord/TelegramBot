module.exports = async (msg, match) => {
  if (!msg.text.includes('/q-') && msg.text.split('/').length < 5)
    return bot.sendMessage(msg.from.id, 'Невереный формат сслылки, добавьте ссылку с поисковой страницы olx')
  try {
    const user = await db.users.findOne({ chat: msg.from.id })
    if (user.limit == user.usage) return bot.sendMessage(user.chat, 'Достигнут лимит ссылок. Максимум 2 ссылки.')
    const url = msg.text.replace(/m\./, '')
    user.links.push({ url })
    user.usage++
    await user.save()
    bot.sendMessage(user.chat, 'Ссылка добавлена успешено')
  } catch (error) {
    bot.sendMessage(msg.from.id, 'Не удалось добавить ссылку')
    console.error(error)
  }
}