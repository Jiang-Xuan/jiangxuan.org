'use strict'

let marked = require('marked') // 引入markdown编译器
let fs = require('fs') // 引入fs模块

// 定义转换markdown到HTML的插件类
function customMDtoHTML(option) {
	// 处理从实例传进来的选项
	this.option = Object.assign({
		template: './template.html',
		filename: `${option.MD.match(/(\/([^/]*).md)$/)[2]}.html`
	}, {
		template: fs.readFileSync(option.template, 'utf-8'),
		nonTransformedMD: fs.readFileSync(option.MD, 'utf-8'),
		fileoutput: option.fileoutput
	})
}

// webpack插件启动的函数 webpack会在这里注入compiler对象 这里不能用箭头函数，会改变this的指向
customMDtoHTML.prototype.apply = function (compiler) {
	let self = this
	// emit事件为webpack即将生成文件之前触发的事件
	compiler.plugin('emit', (compilation, callback) => {
		// 编译markdown内容
		let content = marked(self.option.nonTransformedMD)
		// ---------------------- 处理content ---------------------------
		// 将模板文件的占位符换成转换过后的html代码
		content = self.option.template.replace('<!-- placeholder -->', content)
		// 提取md文件名作为生成文件的名字以及html的标题 弃用
		// 现在使用markdown里面的最大的h1标题作为使用
		// let title = self.option.filename.match(/(.*)\.html$/)[1]
		var articleMainTitle = content.match(/<h1 id(.*)>(.*)<\/h1>/)[2]
		content = content.replace(/<h1 id(.*)>(.*)<\/h1>/, '')
		content = content.replace('<!-- article-main-title -->', articleMainTitle)
		content = content.replace('<!-- title -->', articleMainTitle)
		content = content.replace(/<pre>/g, '<pre class="language-js">')
		// ---------------------- 处理content end -----------------------
		// 在compilation对象中插入自己要生成的文件
		compilation.assets[self.option.fileoutput] = { // eslint-disable-line
			source: () => content,
			size: () => content.length
		}
		// 调用传进来的callback 继续构建过程
		callback()
	})
}
// 导出类
module.exports = customMDtoHTML
