# 天眼大数据风控系统

------

参考网站

> * http://118.31.52.245/yip/index.html#/quanjumoshi/datayuan  
> * https://cra.pintuzhengxin.com/#/report/personal frtx 123456  

项目的运行与安装
``` bash
# 1. 安装node.js(npm) Git
# 2. 克隆代码至本地
git clone git@github.com:Spanky96/RAS.git
# 3. 进入项目目录
cd RAS
# 4. 安装依赖
npm install
# 5. 运行项目
npm run dev
# 6. 推荐使用Chrome浏览器开发和调试
http://localhost:8888

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report


```

### 项目用到的框架

> 1. VUE --前端MVC框架  
> 2. ElementUI --基于VUE的组件和样式，相当于一个前端工具包(http://element.eleme.io/#/zh-CN/component/form)  
> 3. tracking.js -- 图像识别插件， 参考网站官网(https://trackingjs.com/) 看example demo比较好理解  

------

### 针对这个前端你必须会的东西

你必须会的当然就是VUE。VUE入门特别简单，VUE入门学习：https://www.runoob.com/vue2/vue-tutorial.html
在学习之前请先读完下面的内容，都是我纯手打，实打实的心得和干货。  
如果你以前都是写原生js+html+css的那种前端，入门VUE这个过程可能会很痛苦，因为这中间有一个js语法从ES5到ES6的过度。你需要做的就是忘记ES5学习ES6。  
在ES5的时代，我们前端js基本脱离不了jQuery。那个时候我们写前后端分离的项目，当从后台获取到一个JSON要展示成html的时候，用的就是DOM操作的方式，而Jquery把复杂的原生js简化了。这种方式其实效率很低。
而在ES6的时代，jQuery已经退出历史舞台，前端开发几乎都是会使用一套MVC框架，国外流行Angular，React，国内流行VUE。最易于学习的就是VUE了，首先我们查阅文档容易，其次他确实是学习曲线最平缓的。前端的MVC简单的说就是你不用去操作DOM，定义好HTML模型，在HTML里面塞进去几个变量，然后修改那些变量，HTML的内容就随之改变。也就是这些框架中的数据双向或【单项绑定】。  
ES5的时代，一个HTML文件对应一个url地址，也对应一个页面。在VUE中，会有一些不同，但又看似相同。我们的项目url是类似这样的。domain.com#xxxx。#是锚点。所以其实我们做的是一个【单页面应用】。所以页面的跳转（【路由】）需要自己给这个应用配置。  
第三就是你需要熟悉【ES6的语法】，其实和ES5差不多，只不过支持lambda表达式，以及数组对象有更多操作方法，大大方便了前端的操作。
第四点，你要知道现在的开发已经趋向模块化了，elementUI是个工具包，里面的工具实际上就是一个个模块，模块有复用性，所以我们开发的时候就可以用它的很多模块，如弹窗等，很方便。  
第五点，你要知道ESLint。ESLint其实在一个成型的项目组开发中都会有这么一个东西。他的作用就是强制程序员写规范的代码，保持统一规定的Coding style。以及可以避免代码中可能出现的bug，比如
```python
var abc = getAbc();
var b = abc.name.trim();
```
这种情况可能会不通过ESLint，他会检测到Sonar问题，如一下代码可能会空指针异常。
综上： VUE开发你需要先理解VUE的作用。学会里面的单项绑定，路由和新语法。经过项目的练习，你的代码水平真的会提高不少。你也会真的体会到前端开发的妙！（本人以前是做后端开发的，说实话后端会看不起前端，觉得前端没什么技术含量，但是真正做东西，会发现前端开发有其深奥的地方，并不是简单的html+css）

### 目前项目的进度
1. 框架搭建完毕，VUE + ElementUI  
2. 路由配置，针对已实现的功能，已有配置的案例，在src/router/index.js中配置路由。  
3. 功能已经现实的：登录，修改密码，主界面导航，登出。个人信息认真一部分
4. 目前还省很多子界面，子界面难度不高，已有"身份一致性验证"参考,基本。需要开发者模仿表单的定义，以及路由的配置。  
5. 未来可能要做人脸识别的功能，已经开始了前端研究，并有demo。  

### 对该项目开发者的几点要求
1.底层的一些配置文件，如build里面的，如需修改，请告知开发负责人。如需引入安装三方模块，也请告知项目负责人。  
2.注意代码书写风格，遇到ESLint报错，请仔细查看报错原因，纠正coding规范。请不要排斥它，也不要去修改Lint规则，这是提升程序员开发质量和项目组内尊重其他程序员的一种表现。  
3. 想到再说吧～  
