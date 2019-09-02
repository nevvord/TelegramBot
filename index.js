const TelegramBot = require('node-telegram-bot-api');
const Config = require('config');
const axios = require('axios');
const needle = require('needle');
const Cheerio = require('cheerio');

const TOKEN = Config.get('token');
const bot = new TelegramBot(TOKEN, {
    polling: true
});






var id = '337566359';

console.log('BOT RUNING');

function msg () {
    needle.get('https://www.olx.ua/list/q-%D0%B1%D1%80%D0%BE%D1%88%D1%8C/', (err, res) => {
        //console.log(res.body);
        const $ = Cheerio.load(res.body);
        const title = $('table').html();

        for (let index = 0; index < title.length; index++) {
            console.log(title[index]);
        }
        //.console.log(title.html() + (title.length -1));
    });
    //bot.sendMessage(id, `сообщение`);
    //setTimeout(msg, 1000);
}

msg();

bot.on('message', msg => {
    const { id } = msg.chat;

    switch (msg.text) {
        case 'Добавить ссылку':
            bot.sendMessage(id, 'Введите ссылку');
            break;
        case 'Ссылки':
            bot.sendMessage(id, 'Ваши ссылки');
            break;
        case 'Закрыть':
            bot.sendMessage(id, 'Закрываю клавиатуру', {
                reply_markup: {
                    remove_keyboard: true
                }
            });
            break;
        default:
            bot.sendMessage(id, 'Меню бота', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Добавить ссылку',
                            callback_data: '/help'
                        }]
                    ]
                }
            });
            break;
    }

});

bot.on('callback_query', query => {
    const { id } = query.message.chat;
    bot.sendMessage(id, query.data);
});

bot.onText(/\/help/, msg => { //   /\/help (.+)/ (MSG, [Полное сообщение, ссобщение после запроса])
    const { id } = msg.chat;
    bot.sendMessage(id, 'loh');
});