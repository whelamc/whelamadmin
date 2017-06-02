# 个人Admin(管理system)
用vue写H5移动端管理。

## 工具&技能
`vue` + `vuex`+ `vue-router` + `vue-resource` 轮子

`fontawesome` 字体图标组件

`reset.css` 重置样式

`bakemono.js` 机器人

采用css3 column布局

## 使用
```
git clone https://github.com/whelamc/whelamadmin.git

cd whelamadmin

npm install 

```

##APP截图
![](https://raw.githubusercontent.com/whelamc/whelamadmin/master/screenshot/20170602114532.png)
![](https://raw.githubusercontent.com/whelamc/whelamadmin/master/screenshot/20170602114829.png)
![](https://raw.githubusercontent.com/whelamc/whelamadmin/master/screenshot/20170602120304.png)
![](https://raw.githubusercontent.com/whelamc/whelamadmin/master/screenshot/20170602120315.png)
![](https://raw.githubusercontent.com/whelamc/whelamadmin/master/screenshot/20170602120322.png)

# 开发环境
npm run dev
访问 http://localhost:4444/

# 打包
npm run build

## 实现功能
### 登录退出
- [x] 正常登陆
- [x] 退出登录

### 首页
- [x] 换肤功能
- [x] 视频下载功能
- [x] 机器人播报功能
- [x] 天气预报
- [x] 电影预告功能
- [x] 视频下载功能
- [x] 机器人播报功能
- [x] 基本信息(日历,时间,IP,地址,星期)
- [x] 比赛赛果功能
- [x] 每日笑话
- [x] 每日壁纸
- [x] 备忘录(存放localstorage)


### 个人中心
- [x] 返回主页


## 组件分布
1.  播放器组件
2.  顶部导航组件
3.  个人中心组件
4.  登录组件
5.  主页组件
6.  机器人组件
7.  底部组件
8.  侧边栏组件
9.  快捷导航组件

## 目录结构

```
|
|—— build 
|—— config
|——src 资源文件
| |—— api 全局接口
| |—— assets 组件静态资源库
| |—— components 组件库
| |—— pages 页面
| |—— router 路由配置
| |—— store vuex状态管理
| |—— App.vue 应用程序
| |__ main.js SPA入口
|
|__ static 静态资源目录

```


全局API接口:供需txt
代理API接口:https://bird.ioliu.cn/v1/
