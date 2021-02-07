require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')


global.db = require('./db/index')()
global.bot = new TelegramBot(process.env.TOKEN, {
	polling: true
})

require('./render')
require('./bot')



// 		value.links.forEach((val, ind) => {
// 						needle.get(val.link, (err, res) => {
// 							if (err) {
// 								console.log(`err in second link ${err}`);
// 							}else if(res){
// 								const $ = Cheerio.load(res.body);
// 								const link = $('#offers_table a.linkWithHash ').attr('href');
// 								if(link){
// 									needle.get(link, (error, resultat) => {
// 										const $ = Cheerio.load(resultat.body);
// 										const cost = $('div.price-label strong').text();
// 										const img = $('img.bigImage').attr('src');
// 										const title = $('div.offer-titlebox h1').text();
// 										const city = $('a.show-map-link strong').text();
										
// 										const seter = `links.${ind}.oldHref`;
	
// 										if (val.oldHref !== link) {
// 											db.User.updateOne({ chatID : value.chatID },  { $set : { [seter] : link } } ).exec();
// 											const body = `
// *${title}*

// *Город:* ${city}
// *Цена:* ${cost}

// [ОТКРЫТЬ](${link})`;						
// 											if (img) {
// 												bot.sendPhoto(value.chatID, img, {
// 													parse_mode: 'Markdown',
// 													caption: body
// 												});
// 											}else{
// 												bot.sendMessage(value.chatID, body, {
// 													parse_mode: 'Markdown'
// 												});
// 											}
// 										}
// 									});
// 								}else{
// 									console.log(`user ${value._id} get err in ${ind} link`);
// 									db.User.find({chatID: value.chatID}, (err, user) => {
		
// 										let curChange = user[0].links;
// 										console.log(`I'm dell ${curChange[ind]} with user ${value._id}`);
// 										curChange.splice(ind, 1);
// 										db.User.updateOne(
// 											{ chatID: value.chatID },
// 											{ $set: { links: curChange} }
// 										).exec();
// 										bot.sendMessage(value.chatID, `Я удалил вашу запись ${val.links[ind]}, тк незнаю почему`)
// 									});
// 								}
// 							}
// 						});
// 					});
// 				});
// 			});
			// setTimeout(rendering, timer);
// rendering();

// let mod = 0; // 0 - стандартный мод, 2 - мод добавления ссылок

// bot.on("polling_error", (err) => console.log(err));

// bot.on('message', msg => { // Клавиатура и весь функционал
// 	const { id } = msg.chat;

// 	if (mod === 0) {
// 		switch (msg.text) {
// 			case 'Добавить ссылку':
// 				bot.sendMessage(id, 'Отправте ссылку в сообщении');
// 				mod = 1;
// 				break;
// 			case 'Мои ссылки':
// 				bot.sendMessage(id, 'Ваши ссылки:');
// 				db.User.find({chatID: id}, (err, user) => {
// 					user[0].links.forEach((data, index) => {
// 						needle.get(data.link, async (err, res) => {
// 							const body = `{"index" : "${index}"}`;
// 							const $ = Cheerio.load(res.body);
// 							const title = $('li.selected').text();
// 							await bot.sendMessage(id, title, {
// 								reply_markup: {
// 									inline_keyboard: [
// 										[{
// 											text: 'Удалить',
// 											callback_data: body
// 										}]
// 									]
// 								}
// 							});
// 						});


// 					});
// 				});
// 				break;
// 			case 'Контакты':
// 				bot.sendMessage(id, msg.text);
// 				break;
// 			default:
// 				bot.sendMessage(id, 'Я бы с вами пообщался но это не прописанно в моем коде 😉')
// 				break;
// 		}
// 	}else if ( mod === 1) {
// 		if (msg.text.includes('olx') && !msg.text.includes('obyavlenie') && !msg.text.includes('account') && !msg.text.includes('m.olx')){
// 			let curLink = msg.text;
// 			if (msg.text.includes('http://')) {
// 				curLink = curLink.replace('http', 'httpx');
// 			}
// 			if (msg.text.includes('//olx')) {
// 				curLink = curLink.replace('//olx', '//www.olx');
// 			}
// 			db.User.updateOne(
// 				{ chatID : id },
// 				{ $push : 
// 					{ links : 
// 						{link: msg.text, oldHref: ""}
// 					}
// 				}
// 			).exec();
// 			bot.sendMessage(id, 'Ссылка добавлена');	
// 			mod = 0;
// 		}else if (msg.text.includes('m.olx')) {
// 			const curLink = msg.text.replace('m.olx', 'www.olx');
// 			db.User.updateOne(
// 				{ chatID : id },
// 				{ $push : 
// 					{ links : 
// 						{link: curLink, oldHref: ""}
// 					}
// 				}
// 			).exec();
// 			bot.sendMessage(id, 'Ссылка добавлена');
// 			mod = 0;
// 		}else{
// 			mod = 0;
// 			bot.sendMessage(id, 'Это была не ссылка, попытпайтесь еще. Для работы со мной вам стоит добавить ссылку на страницу с поиском объявлений! Спасибо. Пример: https://www.olx.ua/list/q-брошь/')
// 		}
// 	}
// });

// bot.onText(/\/start/, msg => { //   /\/help (.+)/ (MSG, [Полное сообщение, ссобщение после запроса])
// 	const { id } = msg.chat;
	
// 	db.User.create({
// 		chatID : id,
// 		links: []
// 	}, (err, user) => {
// 		bot.sendMessage(id, 'Приступим к работе');
// 		bot.sendMessage(id, 'Клавиатура подключенна', {
// 			reply_markup: {
// 				resize_keyboard: true,
// 				keyboard: [
// 					['Добавить ссылку'],
// 					['Мои ссылки', 'Контакты']
// 				]
// 			}
// 		});
// 	});
// });

// bot.on('callback_query', query => { // Удаление ссылки с БД. Ответ на квери запрос
// 	const { id } = query.message.chat;
// 	const bodyWithQuery = JSON.parse(query.data);

// 	db.User.find({chatID: id}, (err, user) => {
		
// 		let curChange = user[0].links;
// 		console.log(`User ${id} del ${curChange[bodyWithQuery.index]}`);
// 		curChange.splice(bodyWithQuery.index, 1);
// 		db.User.updateOne(
// 			{ chatID: id },
// 			{ $set: { links: curChange} }
// 		).exec();
// 	});
//     bot.sendMessage(id, 'Ссыдка Удалена');
// });

// bot.on('error', console.error);