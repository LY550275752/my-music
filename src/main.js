// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import vueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(vueResource)

const store = new Vuex.Store({
	state:{
		playing:true,
		currentTime:0,
		duration:0,
		coverImgUrl:'http://y.gtimg.cn/music/photo_new/T002R300x300M000003Y6D3F3fqYtN.jpg?max_age=2592000',
		song:{
			id:'109275423',
			mid:'003OUh02HcRHC',
			name:'西门少年',
			singer:'李宇春'
		},
		index:0,
		playList:[
			{
				id:'109275423',
				mid:'003OUh02HcRHC',
				name:'西门少年',
				singer:'李宇春'
			},
			{
				id:'107192078',
				mid:'003OUh02HcRHC',
				name:'告白气球',
				singer:'周杰伦'
			}
		]
	},
	mutations:{
		play:function(state){
			state.playing = true
		},
		pause:function (state){
			state.playing = false;
		},
		setPlayList:function(state,playList){
			state.index = state.playList.length
			state.playList.push(playList.list[playList.index])
			state.song = state.playList[state.index]
		},
		playFront(state){
			state.index = (state.index - 1 + state.playList.length) % state.playList.length
			state.song = state.playList[state.index]
		},
		playNext(state){
			state.index = (state.index + 1 + state.playList.length) % state.playList.length
			state.song = state.playList[state.index]
		},
		resetPlay(state){
			state.playing = false;
			state.playing = true
		}
	},
	getters:{
		currentTime:state =>{
			return parseInt(state.currentTime /60) + ':' + (Array(2).join(0) + (state.currentTime % 60)).slice(-2)
		},
		duration:state => {
			return parseInt(state.currentTime /60) + ':' + (Array(2).join(0) + (state.duration % 60)).slice(-2)
		},
		dataUrl:state =>{
			return 'http://ws.stream.qqmusic.qq.com/' + state.song.id + '.m4a?fromtag=46'
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
