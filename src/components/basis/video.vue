<template>
  <div class="vide-content">
    <video id="myVideo" class="video-js" >
        <source :src="deta" type="video/mp4" >
    </video>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
//import myHead from "./head.vue"
export default {
   components: {
  },
  data() {
    return {
      
    };
  },
  props: {
    //接收父组件传递过来的参数方法
    deta: {
      default: function() {
        return '';
      }
    }
  },
  beforeCreate(){
    //实例未创建，调用不到data数据
  },
  created() {
    //实例创建完成后调用,此阶段完成了数据的观测,可调用data数据
  },
  methods: {
    //定义方法的地方
    //监听方法click事件等，执行drawFeatures方法
    initVideo() {
        //初始化视频方法
        let myPlayer = this.$video(myVideo, {
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            autoplay: "muted",
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: "auto",
        });
    }
  },
  
  mounted() {
    //页面初始化方法
    this.initVideo();
  }
};
</script>

<style scoped>
.vide-content{
    width: 100%;
    height: 100%;
    
}
#myVideo{
    width: 100%;
    height: 100%;
}
</style>
