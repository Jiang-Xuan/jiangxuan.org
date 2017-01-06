# 玩代码之如何自定义terminal提示符

Linux的终端提示符分为四种：

1. [PS1](#-ps1) 默认提示符，使用最多的，一般进入终端就是显示PS1，`jiangxuandeMBP:yuantu jiangxuan`
2. [PS2](#-ps2) 如果一个命令特别长，可以通过在末尾加“\”使其分行显示，PS2就是控制如何显示长命令换行提示符， 默认为`>`
3. [PS3](#ps3-bash-select-) 修改交互式命令select的提示符 
4. [PS4](#ps4-shell-) 修改bash调试模式下的调试信息的输出

## 首先来自定义PS1

* 进入`~`目录，`vim .bash_profile`，有该文件就直接编辑，没有就新建
* 键入shell代码 `source ./.bash_rc`，保存退出
* 现在`vim .bash_rc`，同样，有该文件就在之后编辑，没有新建
* 键入`PS1='PS1'`，保存退出，然后`source ./.bash_rc`
* 现在的提示符就变成了`PS1`字符 

自定义PS1来显示当前处于git的哪一个分支上面

* `vim ~/.bash_rc`
* 键入以下代码


		function git_branch() {
			# 执行git branch获取当前目录下面的git分支信息
			# 如果出现错误信息，我们也不需要，所以投入Linux黑洞
			# 然后用流编辑器sed来处理我们获取的信息
			# -e选项表示我们会有多个命令处理该字符串
			# '/^[^*]/d' 表示我们要删除开头不是*的行
			# http://baiy.cn/utils/_regex_doc/index.htm 正则的资源
			# 's/* \(.*\)/ (\1)' 替换模式，将整个字符串替换成正则匹配的子字符串
			git branch 2> /etc/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
		}
		# 定义PS1的显示模式
		# 系统预定义的一些变量
		# \d ：代表日期，格式为 Weekday Month Date，例如 "Mon Aug 1"
		# \H ：完整的主机名称。举例来说，鸟哥的练习机 linux.dmtsai.tw ，那么这个主机名称就是 linux.dmtsai.tw 
		# \h ：仅取主机名称的第一个名字。以上述来讲，就是 linux 而已， .dmtsai.tw 被省略。
		# \t ：显示时间，为 24 小时格式，如： HH:MM:SS
		# \T ：显示时间，12 小时的时间格式！
		# \A ：显示时间，24 小时格式， HH:MM
		# \u ：目前使用者的账号名称
		# \v ：BASH 的版本信息
		# \w ：完整的工作目录名称。家目录会以 ~ 取代；
		# \W ：利用 basename 取得工作目录名称，所以仅会列出最后一个目录名。
		# \$ ：提示字符，如果是 root 时，提示字符为 # ，否则就是 $ 。
		# $(function_name)来执行函数取得返回值，shell函数如果没有指定return 会以最后一条命令的执行结果为结果返回
		# \e[31;1m和\[\e[0m\] 是用来设置中间的字符串的显示颜色
		# 提示符有点长，我们想要在下一行进行输入，所以把PS1换个行
		#
		PS1='\h:\W \u \e[31;1m$(git_branch)\[\e[0m\]
		$ '


* `source ~/.bash_rc`

### 再个性化一点PS1

* `jiangxuandeMBP:jiangxuan.org jiangxuan 🍀  (master)`

想要显示彩色的字符，mac上面可以按快捷键`command + control + space`来调出emoji输入框，选择一个你喜欢的放在PS1中，我的是这样：

* `git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/🍀  (\1)/'`

还有一个emoji的网站可以复制emoji表情，当然输入法中也有。

**爱emoji**
<http://www.iemoji.com/>

## 再谈终端  PS2

当我们想要输入一个非常长的命令，我们可以分行输入，就像这样


		jiangxuandeMBP:jiangxuan.org jiangxuan$ git branch 2> \
		> /dev/null \
		> sed -e '/^[^*]/d' \
		> -e 's/* \(.*\)/🍀  (\1)/'


上面的`>`就是PS2控制的字符，我们可以通过修改PS2来达到修改该提示符的目的，同样我们在`.bashrc`下面进行修改PS2，`vim ~/.bashrc`，在最后键入这样的代码：


		PS2='continue >'


然后退出保存，然后`source ~/.bashrc`，接下来的效果就是这样的：


		jiangxuandeMBP:jiangxuan.org jiangxuan$ git branch 2> \
		continue > /dev/null \
		continue > sed -e '/^[^*]/d' \
		continue > -e 's/* \(.*\)/🍀  (\1)/'


## PS3用来修改bash的交互式命令select的提示符

select是bash中用来创建交互式的命令，让执行者来选择如何执行代码，例如这样的一段代码：


		select i in first second third fourth quit
			do
				case $i in
					first) echo 'First';;
					second) echo 'Second';;
					third) echo 'Third';;
					fourth) echo 'Fourth';;
					quit) break;;
				esac
			done


这样的代码输出是这样的：


		jiangxuandeMBP:~ jiangxuan 
		$./test_ps3.sh # 注意写完改代码文件之后添加执行权限 chmod 777 ./test_ps3.sh
		1) first
		2) second
		3) third
		4) fourth
		5) quit
		#? # 这里就是PS3控制的地方，默认是 #？


下面我们来修改PS3提示符：


		PS3='选择你想输出几？'
		select i in first second third fourth quit
			do
				case $i in
					first) echo 'First';;
					second) echo 'Second';;
					third) echo 'Third';;
					fourth) echo 'Fourth';;
					quit) echo break;; # 用break来退出select，如果没有退出选项会一直让执行者选，可以用control + c来强制退出
				esac
			done


上面的修改过的代码输出为：


		jiangxuandeMBP:~ jiangxuan 
		$./test_ps3.sh 
		1) first
		2) second
		3) third
		4) fourth
		5) quit
		选择你想输出几？ # 看到了么，这里变了


## PS4 调试shell代码的提示符


shell代码总不是写的都对，有时候我们需要对shell代码进行调试，来看下面的代码：


		#! /bin/bash
		set -x # 这行非常重要，它表示将shell执行环境设置在调试环境下，代码执行的时候不仅会输出结果还会将你写的代码一块儿打印出来
		for i in 1 2 3
		do
			echo $i
		done
		exit


来看看输出：


		+ for i in 1 2 3 # 将每次循环的代码都打印了出来 这个+号就是PS4控制的地方
		+ echo 1
		1
		+ for i in 1 2 3
		+ echo 2
		2
		+ for i in 1 2 3
		+ echo 3
		3
		+ exit


我们来进行修改，加上对PS4的赋值：


		#! /bin/bash
		set -x # 同样，将执行环境置于调试环境下面
		PS4='[${LINENO}]+' # 我们一般需要知道代码在第几行执行
		for i in 1 2 3
		do
			echo $i
		done
		exit

来看看执行结果：


		+ PS4='[${LINENO}]+'
		[5]+for i in 1 2 3
		[7]+echo 1
		1
		[5]+for i in 1 2 3
		[7]+echo 2
		2
		[5]+for i in 1 2 3
		[7]+echo 3
		3
		[9]+exit



以上代码涉及的资源：

1. [sed流编辑器怎么使用](#)
2. [mac终端的显示效果](#)
3. [shell编程之函数](#)
4. [执行环境下的shell代码](#)
5. [shell语句之select](#)
6. [shell语句之for](#)

如何用`terminal`来输出`utf-8`字符串？
<http://stackoverflow.com/questions/602912/how-do-you-echo-a-4-digit-unicode-character-in-bash>

