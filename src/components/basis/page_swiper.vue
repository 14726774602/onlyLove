<template>
  <div class="sw">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(key,i) in deta" :key="i">
          <p>
              <img :src="key" alt />
          </p>
        </div>
      </div>
    </div>
    <!-- 如果需要导航按钮 -->
    <div class="prev">
      <svg t="1588332802248" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1153"><path d="M512 0C229.221434 0 0 229.221434 0 512S229.221434 1024 512 1024 1024 794.778566 1024 512 794.778566 0 512 0zM512 985.358491C250.570868 985.358491 38.641509 773.429132 38.641509 512 38.641509 250.570868 250.570868 38.641509 512 38.641509 773.429132 38.641509 985.358491 250.570868 985.358491 512 985.358491 773.429132 773.429132 985.358491 512 985.358491zM408.788528 516.946113 605.976151 319.758491c3.767547-3.767547 3.767547-9.892226 0-13.659774l-13.659774-13.659774c-3.767547-3.767547-9.892226-3.767547-13.659774 0L360.061585 511.033962c-3.767547 3.767547-3.767547 9.892226 0 13.659774l13.659774 13.659774c1.333132 1.333132 2.994717 2.028679 4.714264 2.415094l209.011925 208.992604c3.728906 3.748226 9.795623 3.748226 13.543849 0l13.543849-13.543849c3.728906-3.728906 3.728906-9.795623 0-13.543849L408.788528 516.946113z" p-id="1154" fill="#dbdbdb"></path></svg>
    </div>
    <div class="next">
      <svg t="1588332959292" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943"><path d="M445.343396 292.438943c-3.767547-3.767547-9.892226-3.767547-13.659774 0l-13.659774 13.659774c-3.767547 3.767547-3.767547 9.892226 0 13.659774l197.187623 197.187623L409.484075 722.69283c-3.728906 3.748226-3.728906 9.795623 0 13.543849l13.543849 13.543849c3.728906 3.748226 9.795623 3.748226 13.543849 0l209.011925-208.992604c1.719547-0.386415 3.381132-1.081962 4.714264-2.415094l13.659774-13.659774c3.767547-3.767547 3.767547-9.892226 0-13.659774L445.343396 292.438943zM512 0C229.240755 0 0 229.221434 0 512 0 794.759245 229.240755 1024 512 1024 794.778566 1024 1024 794.759245 1024 512 1024 229.221434 794.778566 0 512 0zM512 985.358491C250.570868 985.358491 38.641509 773.429132 38.641509 512 38.641509 250.570868 250.570868 38.641509 512 38.641509 773.429132 38.641509 985.358491 250.570868 985.358491 512 985.358491 773.429132 773.429132 985.358491 512 985.358491z" p-id="1944" fill="#dbdbdb"></path></svg>
    </div>
  </div>
  
</template>

<script>
import Swiper from "swiper";
export default {
   components: {
  },
  data() {
    return {
      a_video:'static/img/swiper/swp1.mp4',
      bool:false
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
    fuSwiper: function(el, swipEl) {
      $(el)
        .mousemove(function() {
          swipEl.autoplay.stop();
        })
        .mouseleave(function() {
          swipEl.autoplay.start();
        });
    },

    show_video: function(url){
      //console.log(url)
      this.bool = true;
      this.a_video = url;
      //console.log(this.a_video)
    },

    hide_video: function(){
      this.bool = false;
    }
  },
  
  mounted() {
    //页面初始化方法
    let sw = new Swiper(".swiper-container", {
       // 设置激活的slide居中
      centeredSlides: false,
      //同时显示的slides数量
      slidesPerView: 1,
      //定义slides的数量多少为一组。
      slidesPerGroup: 1,
      //设置sides之间的距离，单位px
      spaceBetween: 10,
      breakpoints: {  //5.0版本 大于等于该宽度时的参数
        1000: {
            slidesPerView: 2,
        }
      },
      // 无限循环
      loop: true,
      //滑动模式
      freeMode: false,
      //自动播放
      autoplay: true,
      // 如果需要分页器
      // pagination: {
      //     el: '.swiper-pagination',
      //     clickable: true,
      // },
      // 如果需要前进后退按钮
      navigation: {
        prevEl: ".prev",
        nextEl: ".next"
      },
      // 懒加载
      lazy: {
        loadPrevNext: true,
        elementClass: "sw-lazy"
      }
    });
    this.fuSwiper(".swiper-container", sw);
  }
};
</script>

<style scoped>
  .sw{
    position: relative;
    padding: 0 70px;
  }
  .sw:hover .prev,.sw:hover .next{
    opacity: 1;
  }
  .prev,.next{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    outline: none;
    opacity: 0;
    transition: all .6s;
    cursor: pointer;
  }

  .prev{
    left: 0;
  }
  .next{
    right: 0;
  }
  .swiper-container{
    width: 100%;
  }
  .swiper-wrapper{
    align-items: center;
  }
  .swiper-slide{
    padding: .5rem;
    border-radius: 3px;
    position: relative;
  }
  .swiper-slide p{
    -webkit-box-shadow: rgba(200,200,200,0) 0px 5px 5px;
    -moz-box-shadow: rgb(200,200,200,0) 0px 5px 5px;
    box-shadow: rgba(200,200,200,0) 0px 5px 5px;
    overflow: hidden;
    border-radius: 5px;
    transition: all 0.6s;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
  .swiper-slide img{
    display: block;
    transition: all 0.6s;
    max-width: 100%;
    max-height: 300px;
    border-radius: 5px;
  }
  .swiper-slide:hover p{
    -webkit-box-shadow: rgba(200,200,200,.8) 0px 5px 5px;
    -moz-box-shadow: rgb(200,200,200,.8) 0px 5px 5px;
    box-shadow: rgba(200,200,200,.8) 0px 5px 5px;
  }
  .swiper-slide:hover img{
    transform: scale(1.2);
  }

  @media(max-width:750px){
    .sw{
      padding: 0;
    }
    .prev,.next{
      display: none;
    }
    .swiper-slide p{
      height: 250px;
    }
    .swiper-slide img{
      max-height: 250px;
    }
  }
</style>
