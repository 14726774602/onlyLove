<template>
  <div>
    <div class="header animated fadeInDown">
      <p class="header-nav">
        <router-link to="/photo" :class="activeClass == 0 ? 'active':''">全部</router-link>
        <router-link to="/photo?sm_class=1" :class="activeClass == 1 ? 'active':''">古韵</router-link>
        <router-link to="/photo?sm_class=2" :class="activeClass == 2 ? 'active':''">山水</router-link>
        <router-link to="/photo?sm_class=3" :class="activeClass == 3 ? 'active':''">独家</router-link>
      </p>
    </div>
    <div class="p-container">
       <photo_falls :deta="photo_com" v-if="isRouterAlive"></photo_falls>
    </div>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
import photo_falls from "@/components/basis/photo_falls"
export default {
  components: {
     photo_falls
  },
  data() {
    return {
      isRouterAlive: false,
      activeClass:0,
      name : '相册',
      photo_com:[]
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
  created() {
    //实例创建完成后调用,此阶段完成了数据的观测,可调用data数据
    //判断路由状态
    this.getPhoto()
    if(this.$route.query.sm_class == undefined){
      this.activeClass = 0
    }else{
      this.activeClass = this.$route.query.sm_class
    }
  },
  mounted() {
    //页面初始化方法
  },
  methods: {
    //定义方法的地方
    //获取相册列表
    getPhoto:function(){
      //this.photo_com = []
      let sm_class = this.$route.query.sm_class
      let url = 'http://localhost:3306/photo/list'
      let that = this
      this.axios.get(url, {
          params: {
            sm_class: sm_class
          }
        })
        .then(function (result) {
          if(result.data.length > 0){
            that.photo_com = result.data
            //得到数据后重新加载组件
            that.reload()
          }else{
            alert('获取数据失败')
          }
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //路由参数发生改变时 重新加载组件
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
  },
  watch: {
      //监听路由参数发生改变时 重新加载组件
      $route(){
        this.getPhoto()
        if(this.$route.query.sm_class == undefined){
          this.activeClass = 0
        }else{
          this.activeClass = this.$route.query.sm_class
        }
      }
  }
};
</script>

<style scoped>
.header{
  width: 100%;
  height:400px;
  position: relative;
  background: #fff url(/static/img/photo/banner.jpg) no-repeat center;
  background-size: cover;
}
.header img{
  display: block;
}
.header p{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(56, 134, 72, 0.43);
}
.header-nav a{
  display: inline-block;
  width: 80px;
  font-size: 1rem;
  color: #fafafa;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  transition: all .5s;
}
.header-nav .active,
.header-nav a:hover{
  border-radius: 50px 0 50px 0;
  background: #58950a;
}
.p-container{
  width: 100%;
}
@media (max-width: 1200px) {
  .header{
    height:300px;
  }
}
@media (max-width: 750px) {
  .header{
    height:150px;
  }
  .header-nav span{
    width: 60px;
    font-size: .9rem;
    line-height: 30px;
  }
}
</style>
