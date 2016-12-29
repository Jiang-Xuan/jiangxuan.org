
import React from 'react'
import {render} from 'react-dom'
import About from './about'

class App extends React.Component {
  constructor(props) {
    super(props);
    let pathname = window.location.pathname;
    //截取页面名字 /a/b.html ==> b.html
    let pageName = pathname.match(/(\/[\w\-]+\.html$)/);
    pageName = pageName && pageName[1] ? pageName[1] : null;
    this.page = pageName ? pages[pageName] : null;
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

render(<App />, document.getElementById("root"));
