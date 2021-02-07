const axios = require('axios')
const cheerio = require('cheerio')

const userLinksGetter = async function (user) {
	user.links.forEach(async (link, index) => {
		try {
			const response = await axios.get(link.url)
			const $ = await cheerio.load(response.data)
			const addLink = await $('#offers_table a.linkWithHash').first().attr('href')
			const title = await $('#offers_table h3 a.linkWithHash strong').first().text()
			const img = await $('#offers_table .fleft').first().attr('src')
			const price = await $('#offers_table .td-price .price strong').first().text()
			const city = await $('#offers_table .bottom-cell small span').first().text()
			if (link.last == addLink) return ''
			const body = `*${title}* \n*Город:* ${city} \n*Цена:* ${price} \n[ОТКРЫТЬ](${addLink})`
			user.links[index].last = addLink
			await user.save()
			if (img) bot.sendPhoto(user.chat, img, {
				parse_mode: 'Markdown',
				caption: body
			})
			else bot.sendMessage(user.chat, body, {
				parse_mode: 'Markdown'
			})
		} catch (error) {
			console.error(error)
		}
	})
}

const rendering = async function () { // Рендеринг ссылок
	const users = await db.users.find({})
	users.forEach(userLinksGetter)
}
// rendering()
setInterval(rendering, 1000)