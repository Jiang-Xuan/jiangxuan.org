
import React from 'react'
import {render} from 'react-dom'
// // import {IS_DAILY, IS_UAT, IS_ONLINE, IS_ABTEST, API_DOMAIN} from './config'
// import {Loading,BlockLoading} from './component/loading/index'
// import Alert from './component/alert/alert'

// import './all.less'

// import Bill from './bill'
// import BillDetail from './bill-detail'
// import RegisterDetails from './register-details-2'
// import InfoConfirm2 from './info-confirm-2'
// import HybridTest from './hybrid-test'

// import Law from './law'
// import Privacy from './privacy'
import About from './about'
// import QaList from './qa-list'
// import NewsDetail from './news-detail'

// import Evaluate from './evaluate'

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
    /**
     * 阻断性加载中状态  BlockLoading
     * 非阻断性加载中状态  Loading
     * **/
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

// register("/bill-detail.html", BillDetail);
// register("/bill.html", Bill);
// register("/register-details-2.html", RegisterDetails);
// register("/info-confirm-2.html", InfoConfirm2);
// register("/hybrid-test.html", HybridTest);

// // 法律须知
// register("/law.html", Law)
// // 隐私声明
// register("/privacy.html", Privacy)
// 关于我们
register("/about.html", About)
// 问题列表
// register("/qa-list.html", QaList)
// // 咨询详情
// register("/news-detail.html", NewsDetail)

// register("/evaluate.html", Evaluate);

render(<App />, document.getElementById("root"));
