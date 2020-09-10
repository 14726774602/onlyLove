<template>
  <div>
    <m_loading v-if="hideLoading"></m_loading>
    <div class="animated fadeInDown">
      <img style="width:100%;" src="/static/img/it/banner.jpg" alt="">
    </div>
    <div class="it">
      <div class="nav">
        <router-link to="/it" :class="activeClass == 0 ? 'active':''">全部</router-link>
        <router-link to="/it?sm_class=1" :class="activeClass == 1 ? 'active':''">css</router-link>
        <router-link to="/it?sm_class=2" :class="activeClass == 2 ? 'active':''">jquery</router-link>
        <router-link to="/it?sm_class=3" :class="activeClass == 3 ? 'active':''">vue-cil</router-link>
        <router-link to="/it?sm_class=4" :class="activeClass == 4 ? 'active':''">demo</router-link>
        <router-link to="/it?sm_class=5" :class="activeClass == 5 ? 'active':''">animate</router-link>
        <router-link to="/it?sm_class=6" :class="activeClass == 6 ? 'active':''">采坑</router-link>
      </div>
      <div class="it-container">
        <div class="it-nav animated fadeInLeft">
          <right_nav></right_nav>
        </div>
        <div class="it-content">
          <it_article class="animated fadeInDown" :deta="article" v-if="isRouterAlive"></it_article>
          <div class="paging">
            <p class="prev" @click="paging(at_num-=1)">上一页</p>
            <p class="present">第{{at_num}}页</p>
            <p class="next" @click="paging(at_num+=1)">下一页</p>
            <p class="sum">共计{{sum_num}}页</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
//import myHead from "./head.vue"
import it_article from "@/components/basis/it_article"
import right_nav from "@/components/basis/right_nav"
import m_loading from "@/components/basis/loading"
export default {
   components: {
     m_loading,
     it_article,
     right_nav
  },
  data() {
    return {
      hideLoading:true,
      isRouterAlive:true,
      activeClass:0,
      article:[],
      at_num:1,
      sum_num:1,
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
    this.activeBtn()
    this.getPage()
    //this.preload()
  },
  mounted() {
    //页面初始化方法
  },
  methods: {
    //定义方法的地方
    //图片预加载的方法
    // preload: function() {
    //   //初始化图片预加载
    //   this.hideLoading = true;
    //   let image = new Image()
    //   image.src = 'http://localhost:8080/static/img/it/banner.jpg'
    //   image.onload = () => {
    //     let that = this
    //     let timeId = setTimeout(function(){
    //       that.hideLoading = false;
    //     },300)
    //   }
    // },
    //判断刚进页面时的参数，激活对应栏目
    activeBtn:function(){
      if(this.$route.query.sm_class == undefined){
        this.activeClass = 0
      }else{
        this.activeClass = this.$route.query.sm_class
      }
    },
    //页数查询
    getPage:function(){
      //总页数查询
      let url = 'http://api.hjwxl.com:3000/article/list_pno'
      //获取当前页数
      let bg_class = '2'
      let sm_class = this.$route.query.sm_class
      let that = this
      this.axios.get(url, {
          params: {
            bg_class: bg_class,
            sm_class: sm_class
          }
        })
        .then(function (result) {
          that.sum_num = Math.ceil(result.data[0]['count(*)']/10)
          if(that.sum_num == 0){
            that.sum_num = 1
          }
          that.paging()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //分页
    paging:function(a){
      if(this.at_num == 1){
        $('.prev').hide()
        if(this.sum_num>this.at_num){
          $('.present').show()
          $('.next').show()
          $('.sum').show()
        }else{
          $('.present').hide()
          $('.next').hide()
          $('.sum').hide()
        }
      }else{
        $('.prev').show()
        $('.sum').show()
        if(this.sum_num>this.at_num){
          $('.next').show()
        }else{
          $('.next').hide()
        }
      }
      this.getArticle();
    },
    //获取文章
    getArticle:function(){
      let url = 'http://api.hjwxl.com:3000/article/list'
      //获取当前页数
      let pno = this.at_num
      let bg_class = '2'
      let sm_class = this.$route.query.sm_class
      let that = this
      this.axios.get(url, {
          params: {
            pno: pno,
            bg_class: bg_class,
            sm_class: sm_class
          }
        })
        .then(function (result) {
          if(result.data.length > 0){
            that.article = result.data
            that.reload()
            that.hideLoading = false;
          }else{
            alert('获取数据失败')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //定义什么发生改变时 重新加载组件
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  },

  watch: {
    //监听路由参数
    $route(){
      if(this.$route.query.sm_class == undefined){
        this.activeClass = 0
      }else{
        this.activeClass = this.$route.query.sm_class
      }
      this.hideLoading = true;
      this.getPage()
    },
  }

  
};
</script>

<style scoped>
.it{
  margin: 20px 0;
  background: rgba(88, 72, 175, .5);
  padding: 20px 10px;
  border-radius: 5px;
}
.it-container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
}

.nav{
  margin-bottom: 20px;
  padding: 5px 20px;
  background: #fafafa;
  border-radius: 3px;
}
.nav a{
  display: inline-block;
  padding: 10px 15px;
  color: #000;
  font-weight: bold;
  border-bottom: 2px solid rgba(255, 0, 0, 0);
  cursor: pointer;
  transition: all .5s;
}
.nav .active,
.nav a:hover{
  color: #f00;
  border-bottom: 2px solid rgba(255, 0, 0, 1);
}

.it-content{
  width: 68%;
}

.it-nav{
  width: 30%;
  position: relative;
  left: 0;
  top: 0;
}
.it-nav div{
  width: 100%;
  background: #fafafa;
  padding: 20px 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.it-nav div .nav-title{
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  line-height: 2;
  letter-spacing: 1px;
}
.it-nav div a{
  color: #333;
  font-size: .9rem;
  margin-left: 1.5rem;
  line-height: 1.5;
  transition: all .3s;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  border-bottom:1px solid rgba(255,0,0,0);
}
.it-nav div a:hover{
  color: #f00;
  border-bottom:1px solid rgba(255,0,0,1);
}

.paging{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 30px 0px;
  letter-spacing: 1px;
  font-size: .9rem;
  color: #333;
}
.paging p{
  margin-left: 10px;
}
.prev,.next{
  color: #000;
  cursor: pointer;
  font-weight: bold;
}
@media (max-width:1200px){
  .it-content{
    width: 100%;
  }
  .it-nav{
    display: none;
  }
}
@media (max-width:750px){
  .it{
    padding: 10px 10px;
  }
  .nav{
    margin-bottom: 10px;
    padding: 5px 10px;
  }
  
}
</style>
