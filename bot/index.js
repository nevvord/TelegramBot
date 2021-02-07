const controller = require('./controllers')

bot.on('polling_error', error => console.log(error))
bot.on('message', msg => {
  // console.log(msg)
})

bot.onText(/\/start/, controller.onStart)
bot.onText(/(Мои ссылки)/, controller.showLinks)
bot.onText(/(https?:\/\/(www.)?(m.)?olx.ua[^\s]+)/g, controller.addLink)
bot.on('callback_query', controller.removeLink)