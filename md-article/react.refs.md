# 关于在react中refs是string类型的弃用
## 弃用，咯
* 在eslint中已经对于在`refs`使用字符串类型的代码进行报错

正确的获取`DOM`应该使用以下代码： 
	
  	var Hello = React.createClass({
    		componentDidMount: function() {
      		var component = this.hello;
      		// ...do something with component
    		},
    		render() {
      		return <div ref={(c) => { this.hello = c; }}>Hello, world.</div>;
    		}
    });
	
在ref中使用箭头函数的方式来获取`DOM`，箭头函数的参数`c`由`react`负责传入，`c`就是原生`DOM`。

下面的代码将被弃用：

  	var Hello = React.createClass({
   		render: function() {
    			return <div ref="hello">Hello, world.</div>;
   		}
  	});
	

  	var Hello = React.createClass({
    		componentDidMount: function() {
     			 var component = this.refs.hello;
      		// ...do something with component
    		},
    		render: function() {
      		return <div ref="hello">Hello, world.</div>;
    		}
  	});
