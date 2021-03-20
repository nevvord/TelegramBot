const axios = require('axios')
const cheerio = require('cheerio')
// const chieldProcess = require('child_process')
// const { PythonShell } = require('python-shell')


const pytonStarter = function (path, options) {
	const start = new Date().getTime()
	console.log('START ON: ', start)
	const { PythonShell } = require('python-shell')
	return new Promise((resolve, reject) => {
		PythonShell.run(path, options, function (err, results) {
			if (err) reject(err)
			resolve(results[0])
			const stop = new Date().getTime()
			console.log('STOP ON:', stop)
			console.log('DIFERENSE:', (stop - start) / 1000)
		})
	})
}

const userLinksGetter = async function (user) {
	user.links.forEach(async (link, index) => {
		const funStart = new Date().getTime()
		console.log('\x1b[36m%s\x1b[0m', 'Function Start in: ', funStart);
		try {
			const options = {
				mode: 'json',
				args: [link.url]
			}
			const path = __dirname  + '/parser.py'
			const pyResult = await pytonStarter(path, options)
			const currArray = pyResult.reverse().filter(elem => !link.last.find(({ link }) => elem.link === link))
			// const currArray = pyResult.filter(element => link.last.includes(element))
			console.log("\x1b[5m", '=============================================')
			console.log("\x1b[5m", 'PyResults: ', pyResult.length)
			console.log("\x1b[5m", 'Includes: ', link.last.includes(pyResult[0]))
			console.log("\x1b[5m", pyResult[0].title, '<==|==>', pyResult[pyResult.length - 1].title)
			console.log("\x1b[5m", 'CurrArrayLength: ', currArray.length)
			console.log("\x1b[5m", '=============================================')
			currArray.forEach(async element => {
				const body = `*${element.title}* \n*Город:* ${element.city} \n*Цена:* ${element.price} \n[ОТКРЫТЬ](${element.link})`
				if (element.image) bot.sendPhoto(user.chat, element.image, {
					parse_mode: 'Markdown',
					caption: body
				})
				else bot.sendMessage(user.chat, body, {
					parse_mode: 'Markdown'
				})
			})
			const funStop = new Date().getTime()
			console.log('\x1b[36m%s\x1b[0m', 'Function Stop in: ', funStop);
			console.log('\x1b[36m%s\x1b[0m', 'Function Diferens: ', (funStop - funStart) / 1000);
			if (currArray.length == 0) return
			user.links[index].fail = 0
			user.links[index].last = pyResult
			await user.save()
		} catch (error) {
			user.links[index].fail++
			if (user.links[index].fail >= 4) {
				user.links = user.links.filter(element => element._id != link._id)
				user.usage--
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

