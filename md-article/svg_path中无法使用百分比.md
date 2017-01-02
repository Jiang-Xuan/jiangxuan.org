# SVG PATH中无法使用百分比

1. 把`clip-path`的CSS声明从CSS文件中分离出来

		string.match(/clip-path: polygon\([0-9\.\%\s\,]+\)\;/)
		
	返回一个CSS声明数组
	
		Array:["clip-path: polygon(16.8% 56.143%, 21.4% 54.143%, 19.1% 60%);",...]
		
2. 把值从CSS声明中分离出来

		string.match(/\([0-9\%\s\,\.]+\)/)
		
	返回一个CSS值数组
	
		Array: ["(16.8% 56.143%, 21.4% 54.143%, 19.1% 60%)"]
		
3. 把每一个坐标对从CSS值中分离出来

		string.match(/[0-9\.\%\s]+[\,\)]/g)
		
	返回坐标组
	
		Array: ["16.8% 56.143%,", " 21.4% 54.143%,",  "19.1% 60%)"]
		
4. 处理坐标组

		var x = parseFloat(coor[0]) / 100
		var y = parseFloat(coor[1]) / 100