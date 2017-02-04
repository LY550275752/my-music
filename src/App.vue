<template>
  <div id="app">
    <search v-show="!blurBgShow" @searchshow="rankShow=false" @searchhide="rankShow=true"></search>
    <rank v-show="rankShow && !blurBgShow"></rank>
    <transition name="play-slide" v-on:after-enter="showBlurBg" v-on:before-leave="hideBlurBg">
      <play v-if="playPageShow"></play>
    </transition>

    <transition name="bar-slide">
      <div id="play-bar" v-show="!playPageShow">
        <audio id="music" :src="dataUrl" autoplay="autoplay"></audio>
        <div class="play-bar-image-container" @click="showPlayPage">
          <img class="play-bar-image" :src="coverImgUrl" />
        </div>
        <p class="play-bar-text">{{song.name}}</p>
        <img class="play-bar-button" :src="playing?iconPause:iconPlay" 
          @click="tapButton" />
      </div>
    </transition>
  </div>
</template>

<script>
import Search from './components/Search'
import Rank from './components/Rank'
import Play from './components/Play'
import {mapMutations,mapState,mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
    Search,
    Rank,
    Play
  },
  data(){
    return {
      blurBgShow:false,
      rankShow:true,
      playPageShow:false,
      iconPlay:require('./assets/icon-play.png'),
      iconPause:require('./assets/icon-pause.png'),
    }
  },
  methods:{
    tapButton: function(event){
      event.preventDefault()
      this.playing?this.pause():this.play()
    },
    showPlayPage:function(event){
      event.preventDefault()
      this.playPageShow = true;
    },
    hidePlayPage:function(event){
      event.preventDefault()
      this.playPageShow = false
    },
    showBlurBg:function(){
      this.blurBgShow = true
    },
    hideBlurBg:function(){
      this.blurBgShow = false
    },
    ...mapMutations([
      'play','pause','playContinue'
    ])
  },
  computed:{
    ...mapState([
      'playing','song','coverImgUrl'
    ]),
    ...mapGetters([
      'dataUrl'
    ])
  },
  watch:{
    playing:function(val){
      if(val){
        console.log('play')
        document.getElementById('music').play()
      }else{
        console.log('pause')
        document.getElementById('music').pause()
      }
    },
    song:function(song){
      this.play();
    }
  }
}
</script>

<style>
* {
  margin:0;
  padding:0;
}
html{
  overflow-x:hidden;
  background: #F5F5F5;
}
body {
  display:flex;
  overflow-x:hidden;
}
#app {
  font-family:Arial,微软雅黑,"Microsoft yahei", "Hiragino Sans GB", "冬青黑体简体中文 w3";
  width:100%;
}
#app a{
  color:#42b983;
  text-decoration:none;
}
#play-bar{
  position:fixed;
  bottom:-1px;
  width:100%;
  height:50px;
  background:-webkit-linear-gradient(top,#f9f9f9,#f3f3f3);
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  z-index:2;
}
.play-bar-image-container{
  width:37.5px;
  height:37.5px;
  padding-left:15px;
  cursor:pointer;
}
.play-bar-image{
  width:37.5px;
  height:37.5px;
  border-radius:5px;
  display:inline-block;
}
.play-bar-text{
  flex-grow:1;
  padding-left:10px;
  cursor:pointer; 
}
.play-bar-button {
  width:20px;
  height:20px;
  padding-right:15px;
  cursor:pointer;
}
.play-slide-enter-active{
  transition:all .3s ease;
}
.play-slide-leave-active{
  transition:all .3s ease-out;
}
.play-slide-enter,.play-slide-leave-active{
  transform:translateY(100vh);
}
</style>
