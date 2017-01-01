import React from 'react'

import './schema.less'

class Schema extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="container">
        <header>
          <nav>
            <a href="#" className="left">Home</a>
            <a href="#" className="right">Github</a>
          </nav>
        </header>
        <main>
          <h1>个人博客架构，详细解释各种细节，各种踩坑</h1>
          <section className="schema-img">
            <div className="summary" style={{textAlign: "center"}}>
              <h3>前后端的所有细节都是由我个人处理，所有的坑我都希望记下来，从前端的webpack等到后端nginx和shell编程。</h3>
            </div>
            <div className="localDevEnv">
              <div className="title">
                本地开发环境
              </div>
              <div className="content center">
                <div>
                  webpack-dev-server用来开发环境
                </div>
                <div>
                  React作为开发框架
                </div>
                <div>
                  ES6+Babel作为代码书写方式
                </div>
                <div>
                  最后webpack打包到build目录
                </div>
                <div>
                  git 推送到远程
                </div>
              </div>
            </div>
            <div className="gitServer">
              <div className="title">
                远程git仓库
              </div>
              <div className="content center">
                <div>
                  git收到push请求并处理
                </div>
                <div>
                  设置webhook让github发送post请求
                </div>
                <div>
                  -
                </div>
                <div>
                  -
                </div>
                <div>
                  -
                </div>
              </div>
            </div>
            <div className="aliyunServer">
              <div className="title">
                阿里云服务器
              </div>
              <div className="content center">
                <div>
                  nginx配置web
                </div>
                <div>
                  nginx反向请求到内部的静态资源托管服务器
                </div>
                <div>
                  nginx反向代理post请求到webhook服务器
                </div>
                <div>
                  -
                </div>
                <div>
                  -
                </div>
              </div>
            </div>
            <div className="clear"></div>
          </section>
          <div className="dividor" />
          <section>
            <h2>基础准备</h2>
            <p>一个git仓库，一个阿里云服务器，一台电脑。</p>
            <h2>本地创建一个git仓库：</h2>
            <code>mkdir jiangxuan.org // 新建一个文件夹</code>
            <code>cd jiangxuan.org // 进入该文件夹</code>
            <code>git init // 初始化一个git仓库</code>
            <p>根据下面的目录结构新建文件目录：</p>
            <div className="dictionary">
              <svg width="400" height="100" style={{margin:"auto",display:"block"}}>
                <g>
                  <polyline points="10,20 100,20" stroke="white" />
                  <text x="0" y="20">jiangxuan.org</text>
                </g>
                <g>
                  <polyline points="100,20 100,40 140,40" stroke="white" />
                  <text x="140" y="43">build</text>
                </g>
                <g>
                  <polyline points="100,40 100,60 140,60" />
                  <text x="140" y="63">src-react</text>
                </g>
              </svg>
            </div>
            <h2>生成npm配置文件：</h2>
            <code>npm init -y // 生成一个默认的package.json</code>
            <h2>下面安装必要的npm包：</h2>
            <p>安装打包工具和用来快速开发的webpack-dev-server&nbsp;&nbsp;&nbsp;<small><a href="#">查看webpack和webpack-dev-server的区别。</a></small></p>

            <code>npm install webpack@1.14.0 webpack-dev-server@1.16.2 -g --save-dev</code>
            <p>安装配置babel来转译我的ECMAScript 6语法和支持React中的一些特性：</p>
            <code>npm install babel-core@6.21.0 babel-loader@6.2.10 --save-dev</code>
            <p>需要两个presets来完成这个任务:</p>
            <ul>
              <li>babel-preset-es2015，有了这个语法包，我们就可以随意使用ES6的新特性。</li>
              <li>babel-preset-react，这个语法包专门用于React的优化，让你的代码中可以使用React ES6 class的语法，同时支持jsx语法。</li>
            </ul>
            <code>npm install babel-preset-es2015@6.18.0 babel-preset-react@6.16.0 -save-dev</code>
            <p>配置<mark>.babelrc</mark></p>
            <p>安装完babel以及它的插件，现在来配置一下它的规则。我喜欢将规则配置在一个新文件中，这也是官方推荐的做法，在项目的根目录新建一个<mark>.babelrc</mark>文件，用编辑器打开：</p>
            <code>&#123;</code>
            <code>&nbsp;&nbsp;"presets": ["es2015", "react"]</code>
            <code>&#125;</code>
          </section>
        </main>
        <footer>
          ©️jiangxuan.org Contact me:645762213#qq.com(请把#换成@)
        </footer>
      </div>
    )
  }
}

export default Schema
