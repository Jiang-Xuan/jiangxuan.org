var fs = require('fs')

var md = fs.readdirSync('./md-article')

md = md.filter((item) => {
	if(/[^(index)].md$/.test(item)) {
		console.log(item)
		return true
	}
})

md = md.map((item) => {
	return item.replace(/.md/, '')
})

var title = '# 所有文章 \n\n'
var content = ''

md.map((item) => {
	content += '* [' + item + '](./md/' + item + '.html)\n'
})

fs.writeFile('./md-article/index.md', title + content, 'utf8', (err) => {
	if(err) {
		console.log(err)
	}
	console.log('写入成功')
})







