require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')


global.db = require('./db/index')()
global.bot = new TelegramBot(process.env.TOKEN, {
	polling: true
})

require('./render')
require('./bot')
