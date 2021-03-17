const axios = require('axios')
const cheerio = require('cheerio')
// const needle = require('needle')
const puppeteer = require('puppeteer')

	const userLinksGetter = async function (user) {
		user.links.forEach(async (link, index) => {
			try {
				// await page.goto(link.url)
				// const test = await page.$('#offers_table a.linkWithHash')
				const response = await axios.get(link.url, { headers: {'User-Agent': 'Mozilla/5.0'} })
				const $ = await cheerio.load(response.data)
				const addLink = await $('#offers_table a.linkWithHash').first().attr('href')
				let validLink = addLink.replace(/\?.*/, '')
				validLink = validLink.replace(/\#.*/, '')
				if (link.last == validLink) return ''
				const title = await $('#offers_table h3 a.linkWithHash strong').first().text()
				const img = await $('#offers_table .fleft').first().attr('src')
				const price = await $('#offers_table .td-price .price strong').first().text()
				const city = await $('#offers_table .bottom-cell small span').first().text()
				const body = `*${title}* \n*Город:* ${city} \n*Цена:* ${price} \n[ОТКРЫТЬ](${validLink})`
				user.links[index].last = validLink
				user.links[index].fail = 0
				await user.save()
				if (img) bot.sendPhoto(user.chat, img, {
					parse_mode: 'Markdown',
					caption: body
				})
				else bot.sendMessage(user.chat, body, {
					parse_mode: 'Markdown'
				})
			} catch (error) {
				user.links[index].fail++
				if (user.links[index].fail >= 4) {
					user.links = user.links.filter(element => element._id != link._id)
					bot.sendMessage(user.chat, `Ваша ссылка была удаленна по причие некоректности. Вызвала ошибку запроса 4 раза. Ссылка: ${link.url}`)
				}
				await user.save()
				console.error('USER: ', user._id, 'LINK ID: ', link._id, 'CODE: ', error.code, error.message)
			}
		})
	}
	
	const renderingPremium = async function () { // Рендеринг ссылок премиума
		const users = await db.users.find({ status: 'premium' })
		users.forEach(userLinksGetter)
	}

	const renderingDefault = async function () { // Рендеринг ссылок стандарта
		const users = await db.users.find({ status: 'default' })
		users.forEach(userLinksGetter)
	}

	setInterval(renderingPremium, 3000)
	setInterval(renderingDefault, 15000)

