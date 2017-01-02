# 在react元素里面插入HTML片段

	在react元素中存在dangerlySetInnerHTML来往react元素里面进行插入从远程数据中的HTML片段或者是从输入框中获取的。

	<div 
		id="J_Content" 
		className="content" 
		dangerouslySetInnerHTML={{__html: < HTML片段 >}}>
				    	
	</div>