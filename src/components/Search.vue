<template>
	<div id="search">
		<div class="search">
			<div class="logo" v-show="!inSearch">
				<div class="title"><img src="./../assets/wangyi.png" />网易云音乐</div>
				<div class="sousuo" @click="toSearch"><img src="./../assets/search.png" /></div>
			</div>
			<div class="search-input" v-show="inSearch">
				<img src="./../assets/left.png" alt="返回" @click="backLogo">
				<form @submit.prevent="search(key)">
					<input type="text" placeholder="搜索 歌曲/专辑/歌手" v-model="key" @focus="focus()">
				</form>
				<span @click="search(key)">搜索</span>
			</div>
		</div>
		<div class="result" v-if="searchRes!=null && searchShow">
			<div class="result-group" v-if="searchRes.song!=null">
				<div class="group">
					<img class="group-img" src="./../assets/icon-music.png" />
					<p class="group-p">单曲</p>
				</div>
				<div class="result-item" v-for="(item,index) in searchRes.song.itemlist">
					<p class="result-title" @click="play(index)">{{item.name}}</p>
					<p class="result-author" @click="play(index)">-{{item.singer}}</p>
					<div class="action-button"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			key:'',
			hotkey:null,
			searchRes:null,
			searchShow:false,
			inSearch:false
		}
	},
	methods:{
		search:function(key){
			this.key = key
			this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',{
					params:{
						is_xml:0,
						format:'jsonp',
						key:key,
						g_tk:5381,
						loginUin:0,
						hostUin:0,
						inCharset:'utf-8',
						outCharset:'utf-8',
						notice:0,
						playform:'yqq',
						needNewCode:0
					},
					jsonp:'jsonpCallback'
			}).then((res) => {
				this.searchRes = res.data.data
			})
		},
		focus:function(){
			this.searchShow = true
			this.$emit('searchshow')
		},
		play:function(index){
			this.$store.commit('setPlayList',{
				index:index,
				list:this.searchRes.song.itemlist
			})
		},
		toSearch:function(){
			this.inSearch = true;
		},
		backLogo:function(){
			this.inSearch = false;
			this.searchShow = false;
			this.$emit('searchhide')
		}
	}
}
</script>

<style scoped>
.search {
	width:100%;
	height:60px;
	display:flex;
	flex-direction:row;
	position:fixed;
	top:0;
	background:#e01010;
	z-index:1;
}
.logo{
	width:100%;
	display:flex;
	flex-direction:row;
	line-height: 60px;
	color:#FFF;
}
.logo .title{
	width:230px;
	margin-left:50px;
}
.logo .sousuo{
	margin:auto;
}
.logo img{
	vertical-align:middle;
	height:30px;
}
.search-input{
	width:100%;
	/*margin-bottom:10px;*/
	display:flex;
	flex-direction:row;
	align-items:center;
}
/*.search-bg{
	width:100%;
	height:60px;
	position:absolute;
	left:0;
	top:0;
	background:url('./../assets/topbar.png') repeat-y 1px 1px;
}*/
.search-input img{
	height:30px;
	width:30px;
	display:inline-block;
	margin:0 5px;
}
.search-input form{
	width:100%;
	border-bottom: 2px solid #fff;
	margin-left:10px;
	margin-right:20px;
	margin-bottom:10px;
	flex-grow:1;
}
.search-input input{
	color:#fff;
	width:100%;
	font-size:18px;
	margin-top:20px;
	margin-right:30px;
	border:none;
	outline:none;
	flex-grow:1;
	background:transparent;
}
.search-input span{
	width:55px;
	height:60px;
	line-height: 60px;
	font-size:18px;
	color:#fff;
	margin-right:5px;
}

.result{
	margin-top:60px;
	margin-bottom:50px;
	background:#eee;
	display:flex;
	flex-direction:column;
}
.result-group{
	background:#fff;
}
.group{
	display:flex;
	flex-direction:row;
	height:40px;
	align-items:flex-end;
	padding-bottom:5px;
	padding-left:10px;
	background:#eee;
}
.group-img{
	width:25px;
	height:25px;
}
.group-p{
	margin-left:10px;
}
.result-item{
	display:flex;
	background:#fff;
	border-bottom:1px #eee solid;
	flex-direction:row;
	margin-left:10px;
	padding-left:10px;
	height:40px;
	align-items:center;
	cursor:pointer;
}
.result-item .result-title{
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
.result-item .result-author{
	color:#929292;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
	flex-grow:1;
}






</style>