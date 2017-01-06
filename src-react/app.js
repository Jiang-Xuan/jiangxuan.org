
import React from 'react'
import {render} from 'react-dom'
import About from './about'
import Schema from './schema'
import Home from './index.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    let pathname = window.location.pathname;
    //截取页面名字 /a/b.html ==> b.html
    let pageName = pathname.match(/(\/[\w\-]+\.html$)/);
    pageName = pageName && pageName[1] ? pageName[1] : null;
    this.page = pageName ? pages[pageName] : null;
    console.log(pageName)
  }
  render(){
    let Page = this.page;
    
    if(Page){
      return <div>
        <Page />
      </div>
    }else{
      return <div>您访问的页面不存在{window.location.pathname}</div>
    }
  }
}

let pages = {};
function register(pathname, page){
  if(!pages[pathname]){
    pages[pathname] = page;
  }else{
    throw new Error(`"${pathname}" Already exist`);
  }
}

// 关于我们
register("/about.html", About)
register("/schema.html", Schema)
register("/index.html", Home)

render(<App />, document.getElementById("root"));
