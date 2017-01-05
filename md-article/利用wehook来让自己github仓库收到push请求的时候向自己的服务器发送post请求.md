# 自动化从github仓库部署到服务器

## 利用webhook来让自己的github仓库收到push请求的时候向自己的服务器发送post请求来实现自动化

利用git开发有三个区域很重要：

* 本地开发用的git仓库
* 远程git仓库(我用的github)
* 服务器上的代码

如果本地一个功能开发测试完毕，我们就会推送到git远程仓库，推送成功之后如果不去服务器上面`git pull`一下，远程仓库的代码永远也不会更新。如果推送的频率比较高，没回都去服务器上面拉取代码是比较烦人的。所以`git`代码托管平台都会提供一个钩子`webhook`，利用这个钩子我们可以实现自动化。

以下以github代码托管平台为例子：

1. 登录github代码托管平台< https://github.com >
2. 选择你想要实现自动化的git仓库
3. 在`star`下面会有一个`Settings`，点进去
4. 在左侧导航栏你会看到有一个`Webhooks`标签，点进去

>Webhooks allow external services to be notified when certain events happen within your repository. When the specified events happen, we’ll send a POST request to each of the URLs you provide. Learn more in our [Webhooks Guide](https://developer.github.com/webhooks/).

大概意思如下：

> Webhooks允许外部的服务接收一个提示当你的仓库发生了某一个事件，当指定的事件发生了，我们就会发送一个POST请求到你提供的所有URL去，学习更多我们的[Webhooks Guide](https://developer.github.com/webhooks/)

* 现在我们开始搭建这个接收webhook的post请求的服务器，基于`node.js`

1. 首先你要连接到自己的服务器，新建一个文件夹，比如`deploy`
2. 然后用`npm install github-webhook-handler`安装我们使用的模块
3. `vim deploy.js`新建启动的js文件
4. 键入以下代码


		var http = require('http')
		var createHandler = require('github-webhook-handler')
		var child_process = require('child_process')
		var fs = require('fs')
		var PORT = ** // 填写端口 `Number`类型
		var HOSTNAME = ** // 填写IP地址 `String`类型
		var handler = createHandler({
			path:'/',// 想要的地址，我这里直接用了根
			secret: '******'// 这里填写你新建webhook时填的秘钥
		})
		
		http.createServer(function(req, res) {
			handler(req, res, function(err) {
				res.statusCode = 404
				res.end('no such location')
			})
		}).listen(PORT, HOSTNAME)

		handler.on('push', function(event) {
			/*
			 *用node.js提供的子进程来实现执行我们的sh文件来自动拉取代码
			 *如果自动部署的文件执行失败了，我们需要一个log文件来记录一下
			 *如果自动部署的文件执行成功了，让我们来打个时间标签记录一下，方便查看
			 *成功失败的log文件是一个文件
			 */
			child_process.exec('source ./deploy.sh', function(err, stdout, stderr) {
				if(err) {
					var errorInfo = '自动部署文件执行失败，失败信息为: \n' + err + '\n'
					fs.appendFileSync('./node.log', errorInfo, 'utf8', function(err) {
						console.log(err)
					})
				} else {
					var nowStr = ''
					var now = new Date()
					nowStr = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + now.getHours() + '时' + now.getMinutes() + '分' + now.getSeconds() + '秒' + ': 自动部署文件执行成功' + '\n'
					fs.appendFileSync('./node.log', nowStr, 'utf8', function(err) {
						console.log(err)
					})
				}
			})
		})


5. 下面我们需要书写自己的`shell`脚本文件来真正的帮助我们来实现自动拉取git服务器上面的文件。
6. 目录下面新建一个脚本文件`vim deploy.sh`
7. 键入以下代码


		#! /bin/bash
		now=`date +%f`

		echo $now >> "./log/$now.log" #我们需要详细的记录我们执行脚本的时间

		echo '::script start' >> "./log/$now.log" #打印脚本开始标识，方便以后对此日志文件进行分析

		cd ~/jiangxuan.org/ #切换到项目目录

		git checkout master >> "/root/jiangxuan.org.deploy/log/$now.log" #切换到master分支

		echo '开始拉取代码' >> "~/jiangxuan.org.deploy/log/$now.log"
		git pull >> "/root/jiangxuan.org.deploy/log/$now.log" #从服务器进行拉取代码，并自动进行合并

		git status >> "/root/jiangxuan.org.deploy/log/$now.log" #获取下git仓库状态

		cp -af ./build ~/blog-product/ >> "/root/jiangxuan.org.deploy/log/$now.log" # 将项目的发布目录拷贝进入网站的访问目录

		echo '::script end' >> "/root/jiangxuan.org.deploy/log/$now.log" #打印脚本结束标识
