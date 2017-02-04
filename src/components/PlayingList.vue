<template>
	<div id="playing-list">
		<div class="title border-1px border-1px-after">
			<img src="./../assets/icon-xunhuan.png" alt="顺序播放">
			<p class="title-text">顺序播放</p>
			<p class="title-button" @click="hidePlayList">完成</p>
		</div>
		<div class="m-list">
			<ul>
				<li class="border-1px border-1px-after list-item" v-for="(item,num) in playList">
					<div class="music-info" @click="play(num)">
						<p class="music-name">{{item.name}}</p>
						<p class="music-author">-{{item.singer | singer}}</p>
						<img class="music-playing" src="./../assets/icon-playing.svg" alt="正在播放" v-show="index == num">
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				menuShow: false,
				menuedIndex:0,
				menus:{}
			}
		},
		methods:{
			play:function (index){
				this.$store.commit('playIndex',index)
			},
			hidePlayList:function(){
				this.$parent.playingListShow = false
			}
		},
		computed:{
			...mapState([
				'playList','index'
			])
		},
		filters:{
			singer:val => {
				if(typeof val === 'string'){
					return val
				} else if(val instanceof Array){
					var singer = ''
					val.forEach(item => {
						singer = singer + item.name + ''
					})
				}
				return singer
			}
		}
	}
</script>

<style scoped>
#playing-list{
	z-index:2;
	position:absolute;
	width:100%;
	min-height:100%;
	background:#fff;
}
.title{
	position:fixed;
	height:50px;
	display:flex;
	align-items:center;
	background:#fff;
	width:100%;
	max-width:68vh;
	z-index:3;
}
.title .title-text{
	flex-grow:1;
}
.title .title-button{
	margin-right:10px;
	cursor:pointer;
}
.title img{
	width:25px;
	display:inline-block;
	cursor:pointer;
	padding-left:10px;
}
.title p{
	padding-left:5px;
}
.m-list{
	margin-top:50px;
}
.m-list ul{
	list-style:none;
}
.m-list .list-item{
	height:40px;
	padding:5px 0;
	margin-left:10px;
	display:flex;
	justify-content:space-between;
	flex-direction:row;
}
.m-list .list-item .music-info{
	height:40px;
	overflow:hidden;
	display:flex;
	flex-direction:row;
	flex-grow:1;
	align-items:center;
	cursor:pointer;
}
.m-list .list-item .music-info .music-name{
	font-size:18px;
	line-height:20px;
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
.m-list .list-item .music-info .music-author{
	white-space:nowrap;
	text-overflow:ellipsis;
	color:#8f8f8f;
	font-size:16px;
	line-height:20px;
	overflow:hidden;
}
.m-list .list-item .music-info .music-playing{
	width:15px;
	height:15px;
	margin-left:10px;
}

@media screnn and (min-width:68vh){
	#playing-list {
		width:68vh;
	}
}
</style>






