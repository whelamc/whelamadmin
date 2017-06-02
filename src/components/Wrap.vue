<template>
  <div id="wrap">
	<div class="waterfall">
		<div class="pin weather">
		    <div class="w-basic">
		        <div class="pull-left">
		    	<p class="title">{{basic.city}}</p>
		    	<p class="tmp">{{wnow.tmp}}℃ {{wnowc.txt}}</p>
		        </div>
		    	<div class="cond pull-left">
			    	<i :class="'w-'+wnowc.code"></i>
		    	</div>
		    </div>
		    <div class="w-fchour">
		    	<ul>
		    		<li v-for="(value,key) in fchour">
		    			<i :class="'w-'+value.cond.code"></i>
		    			<p>{{value.cond.txt}}</p>
		    			<p>{{value.date | cutdate}}</p>
		    		</li>
		    	</ul>
		    </div>
		    <div class="w-fcday">
		    	<ul>
		    		<li v-for="(value,key) in fcday">
		    			<i :class="'pull-left w-'+value.cond.code_d"></i>
		    			<span class="pull-left">{{value.cond.txt_d}}</span>
		    			<span class="pull-left">&nbsp;&nbsp;</span>
		    			<span class="pull-left">最高温：{{value.tmp.max}}℃</span>
		    			<span class="pull-right">{{value.date}}</span>
		    		</li>
		    	</ul>
		    </div>
		    <div class="w-detail">
		    	<ul>
					<li v-for="(value,key) in waqi.city">
					    <p v-if="key === 'qlty'">空气质量</p>
					    <p v-else="key">{{key | upperCase}}</p>
						<p>{{value}}</p>
					</li>
		    	</ul>
		    </div>
		</div>
		<div class="pin download">
		    <p>视频下载器</p>
			<form method="post" action="http://mydowndown.com/downit" target="_blank">
			    <input type="url" name="fb_url" placeholder="Facebook video url" >
				<button type="submit">取得影片</button>
			</form>
			<form method="get" action="http://keepvid.com/" target="_blank">
				<input type="url" name="url" placeholder="Youtube video url">
				<button type="submit">取得影片</button>
			</form>
			<a href="http://youtube.online-downloader.com/index-Chinese#ConvertTOMYF" target="_blank">Youtube备用</a>
		</div>
		<div class="pin filmlist">
			<ul>
				<li v-for="item in filmlist">
					<img class="pull-left img" :src="(item.img)" :alt="(item.nm)" />
					<div class="pull-left content">
					    <p class="nm">{{item.nm}}</p>
						<p class="cat">{{item.cat}}</p>
						<p class="star">主演：{{item.star}}</p>
						<p class="showInfo">{{item.showInfo}}</p>
						<p class="rt">{{item.rt}}</p>
					</div>
				</li>
			</ul>
			<p>数据来自猫眼电影</p>
		</div>
		<div class="pin separateline">
			<p class="title">分割模块</p>
		</div>
		<div class="pin life">
		    <div class="l-info">
	            <p>北京时间：{{ nowtime }}</p>
	            <p>星期：{{ nowday }}</p>
	            <span>IP地址：{{ area }}{{ location }} {{ ip }}</span>
				<div id="calendar">
				    <!-- 年份 月份 -->
				    <div class="month">
				        <ul>
				            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
				            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
				                <span class="choose-year">{{ currentYear }}</span>
				                <span class="choose-month">{{ currentMonth }}月</span>
				            </li>
				            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
				        </ul>
				    </div>
				    <!-- 星期 -->
				    <ul class="weekdays">
				        <li>一</li>
				        <li>二</li>
				        <li>三</li>
				        <li>四</li>
				        <li>五</li>
				        <li style="color:red">六</li>
				        <li style="color:red">日</li>
				    </ul>
				    <!-- 日期 -->
				    <ul class="days">
				        <li @click="pick(day)" v-for="day in days">
				            <!--本月-->
				            <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
				            <span v-else>
				  <!--今天-->
				  <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
				            <span v-else>{{ day.getDate() }}</span>
				            </span>
				        </li>
				    </ul>
				</div>

		    </div>
		</div>
        <div class="pin separateline">
        	<p class="title">分割模块</p>
        </div>
		<div class="pin score">
		    <div class="s-nba">
		    	<p class="title">{{nba}}</p>
		    	<div class="detail" v-for="item in nbalist">
		    	<p class="date">{{item.title}}</p>
		    	<div class="match">
		    		<ul v-for="el in item.tr">
		    			<li><i :style="{backgroundImage:'url(' + el.player1logo + ')'}"></i><span>{{el.player1}}</span></li>
		    			<li><span>{{el.score}}</span></li>
		    			<li><span>{{el.player2}}</span><i :style="{backgroundImage:'url(' + el.player2logo + ')'}"></i></li>
		    		</ul>
		    	</div>
		    	<div class="more" v-for="el in item.tr">
		    		<span class="pull-left">{{el.time}}</span>
		    		<a class="pull-right" :href="(el.link1url)"> {{el.link1text}}</a>
		    		<span class="pull-right"> | </span>
		    		<a class="pull-right" :href="(el.link2url)">{{el.link2text}}</a>
		    	</div>
		    	</div>
		    </div>
		    <div class="s-football">
		    	<p class="title">{{football}}</p>
		    	<i class="fa fa-search fbsearch" @click="searchVisible"></i>
		    	<p class="date">{{sc1date}} {{sc1statue}}</p>
		    	<div class="detail" v-for="item in saicheng1">
		    	<div class="match">
		    		<ul>
		    			<li><span>{{item.c4T1}}</span></li>
		    			<li><span>{{item.c4R}}</span></li>
		    			<li><span>{{item.c4T2}}</span></li>
		    		</ul>
		    	</div>
		    	<div class="more">
		    		<span class="pull-left">{{item.c3}}</span>
		    		<a class="pull-right" :href="(item.c51Link)"> {{item.c51}}</a>
		    		<span class="pull-right"> | </span>
		    		<a class="pull-right" :href="(item.c52Link)">{{item.c52}}</a>
		    	</div>
		    	</div>
			    <div class="modal-search" v-if="modalsearch">
			        <p>輸入搜尋聯賽</p>
			    	<input type="text" v-model="football" @change="getSearchData(football)" value="" @keyup.13="keysearch" />
			    	<button type="button" @click="closesearch">關閉</button>
			    </div>
		    </div>
		</div>
		<div class="pin separateline">
			<p class="title">分割模块</p>
		</div>
		<div class="pin memo">
		    <img src="https://bing.ioliu.cn/v1/rand" />
		    <p>備忘錄</p>
            <textarea name="" rows="10" v-model="memotext"></textarea>
		</div>
	</div>
  </div>
</template>

<script>

let moment = require('moment')

export default {
  name: 'wrap',
  data () {
    return {	  
      basic: '',
      wnow: '',
      wnowc: '',
      waqi: '',
      fcday: '',
      fchour: '',
      area:'',
      location: '',
      ip: '',
      nowtime: '',
      nowday: '',
      calendar: '',
      football: '英超',
      nba: '',
      nbalist: '',
      saicheng1: '',
      saicheng2: '',
      sc1statue: '',
      sc1date: '',
      modalsearch: false,
	  currentDay: 1,
	  currentMonth: 1,
	  currentYear: 1970,
	  currentWeek: 1,
	  days: [],
	  memotext: '',
	  filmlist: ''
    }
  },
  watch: {
  	memotext(newVal,oldVal){
  		window.localStorage.setItem("memotext",newVal)
  	},
  	nowtime(newVal,oldVal){
        this.$store.commit('isTime', newVal)
  	}
  },
  created() {
    this.initData(null);
  },
  mounted(){
	this.getWeatherData()
	this.getLifeData()
	this.getDayData()
	this.interval = setInterval(this.getTimeData, 1000)
	//this.getCalData()
	this.getScoreData()
	this.getSearchData(this.football)
	this.getMemoData()
	this.getFilmData()
  },
  methods: {
  	searchVisible(){
        if(this.modalsearch == false){this.modalsearch = true}else{this.modalsearch = false}
  	},
    getWeatherData(){
        this.$http.get('https://free-api.heweather.com/v5/weather?city=guangzhou&key=f5024e37e0e2433b9c693757906c109d').then((res) => {
        	let data = res.data.HeWeather5
        	this.basic = data[0].basic
        	this.wnow = data[0].now
        	this.wnowc = data[0].now.cond
        	this.waqi = data[0].aqi
        	this.fcday = data[0].daily_forecast
        	this.fchour = data[0].hourly_forecast
        })
		.catch((res) => {
		    console.log(res);
		});
    },
    getLifeData(){
        this.$http.get('https://bird.ioliu.cn/ip').then((res) => {
        	let data = res.data.data
        	this.area = data.area
        	this.location = data.location
        	this.ip = data.ip
        })
		.catch((res) => {
		    console.log(res);
		})
    },
    getTimeData(){
	    this.nowtime = moment().format("hh:mm:ss a")
	    this.$store.commit('isTime', this.nowtime)
    },
    getDayData(){
    	this.nowday = moment().format("dddd")
    },
    getScoreData(){
        this.$http.get('https://bird.ioliu.cn/v1/?url=api.avatardata.cn/Nba/NomalRace?key=4ed88f1bd7d645c9a148c70fb7c73a72').then((res) => {
        	let data = res.data.result
        	this.nba = data.title.substring(0,6)
        	this.nbalist = data.list
        })
		.catch((res) => {
		    console.log(res);
		})
    },
    getSearchData(a){
    	var b = window.localStorage.getItem("football")
    	if(!a){a=b}else{a=a}
        this.$http.get('https://bird.ioliu.cn/v1/?url=api.avatardata.cn/Football/Query?key=29c9ef8d76564e74b4ec168466791cf0&league='+a).then((res) => {
        	let data = res.data.result
        	this.football = data.key.substring(0,6)
        	this.saicheng1 = data.views.saicheng1
        	this.saicheng2 = data.views.saicheng2
        	this.sc1statue = data.views.saicheng1[0].c1
        	this.sc1date = data.views.saicheng1[0].c2
        })
		.catch((res) => {
		    console.log(res);
		})
    },

    //日曆插件start
    initData(cur){
	   var date;
	   if (cur) {
	    date = new Date(cur);
	   } else {
	    date = new Date();
	   }
	   this.currentDay = date.getDate();
	   this.currentYear = date.getFullYear();
	   this.currentMonth = date.getMonth() + 1;
	   this.currentWeek = date.getDay(); // 1...6,0
	   if (this.currentWeek == 0) {
	    this.currentWeek = 7;
	   }
	   var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
	   this.days.length = 0;
	   // 今天是周日，放在第一行第7个位置，前面6个
	   for (var i = this.currentWeek - 1; i >= 0; i--) {
	    var d = new Date(str);
	    d.setDate(d.getDate() - i);
	    this.days.push(d);
	   }
	   for (var i = 1; i <= 35 - this.currentWeek; i++) {
	    var d = new Date(str);
	    d.setDate(d.getDate() + i);
	    this.days.push(d);
	   }
    },
    pick(date){
	   alert(this.formatDate( date.getFullYear() , date.getMonth() + 1, date.getDate()));
    },
    pickPre(year, month) {
	   // setDate(0); 上月最后一天
	   // setDate(-1); 上月倒数第二天
	   // setDate(dx) 参数dx为 上月最后一天的前后dx天
	   var d = new Date(this.formatDate(year , month , 1));
	   d.setDate(0);
	   this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
	   },
	   pickNext: function(year, month) {
	   var d = new Date(this.formatDate(year , month , 1));
	   d.setDate(35);
	   this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
	   },
	   pickYear: function(year, month) {
	   alert(year + "," + month);
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate(year,month,day){
	   var y = year;
	   var m = month;
	   if(m<10) m = "0" + m;
	   var d = day;
	   if(d<10) d = "0" + d;
	   return y+"-"+m+"-"+d
    },
    //日曆插件end

    keysearch(ev){
		window.localStorage.setItem("football", this.football)
		this.getSearchData(this.football)
		this.modalsearch = false
  
    },
    closesearch(){
    	this.modalsearch = false
    },
    getMemoData(){
    	let a = window.localStorage.getItem("memotext")
    	if(!a){this.memotext = "空"}else{this.memotext = a}
    },
    getFilmData(){
        this.$http.get('https://bird.ioliu.cn/v1/?url=m.maoyan.com/movie/list.json?type=hot&offset=0&limit=10').then((res) => {
        	let data = res.data.data
        	this.filmlist = data.movies
        })
		.catch((res) => {
		    console.log(res);
		})
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  filters: {
  	//小时过滤器
  	cutdate: function (value) {
  		return value.substring(11)
	},
	//转换大小写
	upperCase: function (value) {
		return value.toUpperCase();
	}
  }
}
</script>

<style>
	#wrap {
		padding: 15px 15px;
		margin: 0 auto;
		padding-bottom: 37px
	}
	.waterfall {
		-moz-column-count: 5;
		-webkit-column-count: 5;
		column-count: 5;
		-moz-column-gap: 1em;
	    -webkit-column-gap: 1em;
		column-gap: 1em;
		width: 100%;
		margin: 0 auto
	}
	.pin {
		margin: 0 0 15px;
		padding: 15px;
		padding-bottom: 10px;
		width: 100%;
        display: inline-block;
        page-break-inside: avoid; /* Firefox */
        break-inside: avoid; /* IE 10+ */
        -webkit-column-break-inside: avoid;
		-moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
		-webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
	}
	.pin img {
		width: 100%;
		padding-bottom: 10px;
		margin-bottom: 5px;
		border-bottom: 1px solid #cccccc
	}
	.w-basic {
		overflow: hidden;
		padding: 0 10px
	}
	.w-basic .title {
		font-size: 30px;
		font-weight: bold
	}
	.w-basic .tmp {
		font-size: 30px;
		margin: 5px 0
	}
	.w-basic .cond {
		vertical-align: middle
	}
	.w-basic .cond i {
		width: 96px;
		height: 96px
	}

	.w-fchour ul{
		display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */  
		display: -moz-box; /* Firefox 17- */  
		display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */  
		display: -moz-flex; /* Firefox 18+ */  
		display: -ms-flexbox; /* IE 10 */  
		display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */  
	    -webkit-flex-flow:row wrap;
	    -webkit-box-orient:horizontal;
	    -webkit-box-lines:multiple;
	　　-moz-flex-flow:row wrap;
	    box-orient:horizontal;
	    box-lines:multiple;
	    flex-flow:row wrap;
		width: 100%
	}
	.w-fchour li{
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    text-align: center
	}
	.w-fcday li {
		height: 36px;
		line-height: 36px;
		margin: 5px 0
	}
	.w-detail ul {
		display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */  
		display: -moz-box; /* Firefox 17- */  
		display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */  
		display: -moz-flex; /* Firefox 18+ */  
		display: -ms-flexbox; /* IE 10 */  
		display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */  
	    -webkit-flex-flow:row wrap;
	    -webkit-box-orient:horizontal;
	    -webkit-box-lines:multiple;
	　　-moz-flex-flow:row wrap;
	    box-orient:horizontal;
	    box-lines:multiple;
	    flex-flow:row wrap;
		width: 100%
	}
	.w-detail ul li {
	    width: 25%;
		padding: 20px 0;
	    vertical-align: middle;
	    text-align: center;
	    background-color: rgba(0, 0, 0, 0.3)
	}
	.w-detail ul li p:first-child {
		margin-bottom: 5px
	}
	.life {
		height: 750px
	}
	.l-info {
		padding: 0 10px;
		padding-bottom: 10px;
		background-color: rgba(255, 255, 255, 0.1)
	}
	.l-info p {
        font-size: 28px
	}
	.l-info span {
		font-size: 16px;
	}
	.l-info > span {
		display: block;
		margin-bottom: 5px
	}
	.s-football ,.s-nba{
		border-bottom: 1px dashed #ccc;
		margin-bottom: 10px;
		padding-bottom: 5px;
		position: relative
	}
	.score .detail {
		margin: 10px 0
	}
    .score .title {
    	text-align: center;
    	font-size: 28px;
        border-bottom: 1px dashed #ccc
    }
    .score .date {
    	font-size: 20px
    }
    .score .match, .score .more{
    	background-color: rgba(255, 255, 255, 0.1) 
    }
    .score .match ul {
		display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */  
		display: -moz-box; /* Firefox 17- */  
		display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */  
		display: -moz-flex; /* Firefox 18+ */  
		display: -ms-flexbox; /* IE 10 */  
		display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */  
	    -webkit-flex-flow:row wrap;
	    -webkit-box-orient:horizontal;
	    -webkit-box-lines:multiple;
	　　-moz-flex-flow:row wrap;
	    box-orient:horizontal;
	    box-lines:multiple;
	    flex-flow:row wrap;
		width: 100%;
		padding: 2px 0
    }
	.score .match ul li {
	    width: 33.33%;
	    vertical-align: middle;
	    text-align: center;
	    font-size: 14px;
	    height: 36px;
	    line-height: 36px
	}
	.score .match ul li span {
		vertical-align: top;
		line-height: 36px
	}
    .score .match i {
    	display: inline-block;
    	width: 36px;
    	height: 36px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat
    }
    .score .more {
    	overflow: hidden;
    	padding: 0 5px
    }
    .score .fbsearch {
    	position: absolute;
    	right: 0;
    	font-size: 28px; 
    	margin-top: -34px;
    	cursor: pointer
    }
    .s-football .date {
    	margin-top: 10px
    }
    .modal-search {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        background-color: rgba(0,0,0,0.8);
        padding: 10px 0;
		-webkit-animation-name: fadeIn; /*动画名称*/
		-webkit-animation-duration: 1s; /*动画持续时间*/
		-webkit-animation-iteration-count: 1; /*动画次数*/
		-webkit-animation-delay: 0s; /*延迟时间*/
    }
    .modal-search p {
    	margin-bottom: 10px
    }
    .modal-search input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: none;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        display: block;
        font-size: inherit;
        height: 30px;
        line-height: 1;
        outline: 0;
        padding: 0 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        vertical-align: middle;
        display: block;
        margin: 0 auto;
        margin-bottom: 10px
    }
    .modal-search button {
	    font-size: inherit;
	    border-color: transparent;
	    background-color: transparent;
	    color: inherit;
	    border-top: 0;
	    border-bottom: 0;
	    display: block;
	    margin: -10px;
	    display: inline-block;
	    line-height: 1;
	    white-space: nowrap;
	    cursor: pointer;
	    background: #fff;
	    border: 1px solid #bfcbd9;
	    color: #1f2d3d;
	    -webkit-appearance: none;
	    text-align: center;
	    box-sizing: border-box;
	    outline: 0;
	    margin: 0;
	    padding: 5px;
	    font-size: 14px
    }
	@-webkit-keyframes fadeIn {
		0% {
		opacity: 0; /*初始状态 透明度为0*/
		}
		50% {
		opacity: 0; /*中间状态 透明度为0*/
		}
		100% {
		opacity: 1; /*结尾状态 透明度为1*/
		}
	}

	#calendar{ width:100%; margin: 0 auto; box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12); } .month { width: 100%; background: #ccc; } .month ul { margin: 0; padding: 0; display: flex; justify-content: space-between; } .year-month { display: flex; flex-direction: column; align-items: center; justify-content: space-around; } .year-month:hover { background: rgba(150, 2, 12, 0.1); } .choose-year { padding-left: 20px; padding-right: 20px; } .choose-month { text-align: center; font-size: 1.5rem; } .arrow { padding: 15px; } .arrow:hover { background: rgba(100, 2, 12, 0.1); } .month ul li { color: white; font-size: 20px; text-transform: uppercase;} .weekdays { margin: 0; padding: 10px 0; background-color: #ccc; display: flex; flex-wrap: wrap; color: #FFFFFF; justify-content: space-around; } .weekdays li { display: inline-block; width: 13.6%; text-align: center; } .days { padding: 0; background: #FFFFFF; margin: 0; display: flex; flex-wrap: wrap; justify-content: space-around; } .days li { list-style-type: none; display: inline-block; width: 14.2%; text-align: center; padding-bottom: 15px; padding-top: 15px; font-size: 1rem; color: #000; } .days li .active { padding: 6px 10px; border-radius: 50%; background: #ccc; color: #fff; } .days li .other-month { padding: 5px; color: gainsboro; } .days li:hover { background: #e1e1e1; }

	.memo {
		height: 750px
	}
	.memo p {
        text-align: center;
        font-size: 20px;
        color: #fff000
	}
    .memo textarea {
    	background-color: transparent;
    	border: 1px solid #fff000;
    	width: 100%;
    	color: #fff000;
    	padding: 5px;
    	font-size: 12px;
    	height: 280px
    }
    .filmlist > p {
    	text-align: center;
    }
    .filmlist ul li {
    	width: 100%;
    	overflow: hidden;
    }
    .filmlist ul li img{
        display: block;
        width: 30%;
        height: 100%;
        border-bottom: 0
    }
    .filmlist .content {
    	margin-left: 3%;
    	width: 67%;
    }
    .filmlist .content .nm {
        font-size: 20px;
    }
    .filmlist .content .cat {
        font-size: 16px;
        color: rgba(255,255,255,0.8)
    }
    .filmlist .content .star {
        font-size: 16px;
        color: rgba(255,255,255,0.8)
    }
    .filmlist .content .showInfo {
        font-size: 16px;
        color: rgba(255,255,255,0.5)
    }
    .filmlist .content .rt {
        font-size: 16px;
        color: rgba(255,255,255,0.5)
    }
    .download p {
    	font-size: 30px;
    	text-align: center;
    	margin-bottom: 10px
    }
    .download form {
    	margin-bottom: 20px;
    	overflow: hidden;
    	text-align: center
    }
    .download input {
	    position: relative;
	    float: left;
	    width: 100%;
	    height: 36px;
	    margin-bottom: 5px;
	    background-color: transparent;
	    border: 1px solid #e7e7e7;
	    padding: 10px;
	    outline: none
    }
    .download button {
	    position: relative;
	    width: 50%;
	    height: 36px;
	    background-color: rgba(0,0,0,0.3);
	    margin: 0 auto;
	    border: 1px solid #e7e7e7;
	    color: #fff;
	    cursor: pointer
    }
    .download a {
    	display: block;
    	margin: 0 auto;
    	width: 100%;
    	font-size: 16px;
    	text-align: center;
    	margin-bottom: 10px
    }
    .download input:focus,.download button:hover {
    	color: #fff000;
    	border: 1px solid #fff000
    }

	.separateline .title{
	    position:relative;
	    text-align:center;
	}
	.separateline .title:before,.separateline .title:after {
	    content: "";
	    width: 40%;
	    height: 1px;
	    position: absolute;
	    top: 50%; 
	}
	.separateline .title:before {
	    background: -webkit-linear-gradient(right, #666 , #eee); 
	    background: -o-linear-gradient(left, #666 , #eee); 
	    background: -moz-linear-gradient(left,#666 , #eee);
	    background: linear-gradient(to left, #666 , #eee); 
	    left: 2px;
	}
	.separateline .title:after {
	    background: -webkit-linear-gradient(left, #666 , #eee); 
	    background: -o-linear-gradient(right, #666 , #eee); 
	    background: -moz-linear-gradient(right,#666 , #eee);
	    background: linear-gradient(to right, #666 , #eee); 
	    right: 2px;
	}

	@media (max-width: 1634px) {
		.waterfall {
			-moz-column-count: 4;
			-webkit-column-count: 4;
			column-count: 4;
		}
	}
	@media (max-width: 1199px) {
		.waterfall {
			-moz-column-count: 3;
			-webkit-column-count: 3;
			column-count: 3;
		}
		.separateline {
			display: none
		}
	}

	@media (max-width: 991px) {
		.waterfall {
			-moz-column-count: 2;
			-webkit-column-count: 2;
			column-count: 2;
		}
	}

	@media (max-width: 768px) {
		.waterfall {
			-moz-column-count: 1;
			-webkit-column-count: 1;
			column-count: 1;
			-moz-column-gap: 0;
		    -webkit-column-gap: 0;
			column-gap: 0;
		}
	}



	/*weather icon*/
	.weather i{
		display: inline-block;
		width: 36px;
		height: 36px;
	    background-size: contain;
	    background-position: center;
	    background-repeat: no-repeat
	}
	.w-100 {background-image: url('/static/images/cond/100.png');}
	.w-101 {background-image: url('/static/images/cond/101.png');}
	.w-102 {background-image: url('/static/images/cond/102.png');}
	.w-103 {background-image: url('/static/images/cond/103.png');}
	.w-104 {background-image: url('/static/images/cond/104.png');}
	.w-200 {background-image: url('/static/images/cond/200.png');}
	.w-201 {background-image: url('/static/images/cond/201.png');}
	.w-202 {background-image: url('/static/images/cond/202.png');}
	.w-203 {background-image: url('/static/images/cond/203.png');}
	.w-204 {background-image: url('/static/images/cond/204.png');}
	.w-205 {background-image: url('/static/images/cond/205.png');}
	.w-206 {background-image: url('/static/images/cond/206.png');}
	.w-207 {background-image: url('/static/images/cond/207.png');}
	.w-208 {background-image: url('/static/images/cond/208.png');}
	.w-209 {background-image: url('/static/images/cond/209.png');}
	.w-210 {background-image: url('/static/images/cond/210.png');}
	.w-211 {background-image: url('/static/images/cond/211.png');}
	.w-212 {background-image: url('/static/images/cond/212.png');}
	.w-213 {background-image: url('/static/images/cond/213.png');}
	.w-300 {background-image: url('/static/images/cond/300.png');}
	.w-301 {background-image: url('/static/images/cond/301.png');}
	.w-302 {background-image: url('/static/images/cond/302.png');}
	.w-303 {background-image: url('/static/images/cond/303.png');}
	.w-304 {background-image: url('/static/images/cond/304.png');}
	.w-305 {background-image: url('/static/images/cond/305.png');}
	.w-306 {background-image: url('/static/images/cond/306.png');}
	.w-307 {background-image: url('/static/images/cond/307.png');}
	.w-308 {background-image: url('/static/images/cond/308.png');}
	.w-309 {background-image: url('/static/images/cond/309.png');}
	.w-310 {background-image: url('/static/images/cond/310.png');}
	.w-311 {background-image: url('/static/images/cond/311.png');}
	.w-312 {background-image: url('/static/images/cond/312.png');}
	.w-313 {background-image: url('/static/images/cond/313.png');}
	.w-400 {background-image: url('/static/images/cond/400.png');}
	.w-401 {background-image: url('/static/images/cond/401.png');}
	.w-402 {background-image: url('/static/images/cond/402.png');}
	.w-403 {background-image: url('/static/images/cond/403.png');}
	.w-404 {background-image: url('/static/images/cond/404.png');}
	.w-405 {background-image: url('/static/images/cond/405.png');}
	.w-406 {background-image: url('/static/images/cond/406.png');}
	.w-407 {background-image: url('/static/images/cond/407.png');}
	.w-500 {background-image: url('/static/images/cond/500.png');}
	.w-501 {background-image: url('/static/images/cond/501.png');}
	.w-502 {background-image: url('/static/images/cond/502.png');}
	.w-503 {background-image: url('/static/images/cond/503.png');}
	.w-504 {background-image: url('/static/images/cond/504.png');}
	.w-507 {background-image: url('/static/images/cond/507.png');}
	.w-508 {background-image: url('/static/images/cond/508.png');}
	.w-900 {background-image: url('/static/images/cond/900.png');}
	.w-901 {background-image: url('/static/images/cond/901.png');}
	.w-999 {background-image: url('/static/images/cond/999.png');}
</style>
