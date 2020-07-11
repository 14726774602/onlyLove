<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(key,i) in deta" :key="i">
                <router-link :to="'/photo_page?id='+key.id">
                    <div>
                        <img src="/static/img/bg.png" alt />
                        <p :style="{backgroundImage: 'url(' + key.img_url + ')'}"></p>
                    </div>
                    <p class="sw-title">{{key.title}}</p>
                    <p class="sw-time">{{key.issueTime | dateFormat}}</p>
                </router-link>
            </div>
        </div>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
//import myHead from "./head.vue"
import Swiper from "swiper";
export default {
   components: {
  },
  data() {
    return {
        name : '相册轮播',
        
       
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
  mounted() {
    //页面初始化方法
    let  sw = new Swiper(".swiper-container", {
            // 设置激活的slide居中
            centeredSlides: false,
            //同时显示的slides数量
            slidesPerView: 1,
            //定义slides的数量多少为一组。
            slidesPerGroup: 1,
            //设置sides之间的距离，单位px
            spaceBetween: 10,
            breakpoints: {  //5.0版本 大于等于该宽度时的参数
                1100: {
                    slidesPerView: 3,
                },
                750: {
                    slidesPerView: 2,
                }
            },
            // 无限循环
            loop: true,
            //滑动模式
            freeMode: false,
            //自动播放
            autoplay: true,
        })
    this.fuSwiper(".swiper-container", sw);
  },
  methods: {
    //定义方法的地方
    fuSwiper: function(el, swipEl) {
      $(el)
        .mousemove(function() {
          swipEl.autoplay.stop();
        })
        .mouseleave(function() {
          swipEl.autoplay.start();
        });
    },
   
  }
};
</script>

<style scoped>
.swiper-slide a{
    display: block;
    padding: .5rem;
    background: #fff;  
    border-radius: 3px;
}
.swiper-slide a div{
    position: relative;
}
.swiper-slide a div img{
    display: block;
    width: 100%;
}
.swiper-slide a div p{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover; 
}
.sw-title{
    font-size: 1rem;
    color: #333;
    text-align: center;
    margin-top: 5px;
    transition: all .3s;
    font-weight: bold;
}
.sw-time{
    text-align: center;
    font-size: .8rem;
    color: #f00;
    margin-top: 5px;
}
.swiper-slide a:hover .sw-title{
    color: #f00;
}
</style>
