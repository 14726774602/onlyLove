<template>
  <div>
    <div class="life-title animated fadeInDown">
      <img src="/static/img/life.jpg" alt="">
    </div>
    <div class="life-class animated fadeInLeft">
      <router-link :class="activeClass == 0 ? 'active':''" to="/life">全部</router-link>
      <router-link :class="activeClass == 1 ? 'active':''" to="/life?sm_class=1">心情</router-link>
      <router-link :class="activeClass == 2 ? 'active':''" to="/life?sm_class=2">旅行</router-link>
      <router-link :class="activeClass == 3 ? 'active':''" to="/life?sm_class=3">资讯</router-link>
    </div>
    <div class="life-container">
      <falls :deta="article" v-if="isRouterAlive"></falls>
      <div class="paging">
        <p class="prev" @click="paging(at_num-=1)">上一页</p>
        <p class="present">第{{at_num}}页</p>
        <p class="next" @click="paging(at_num+=1)">下一页</p>
        <p class="sum">共计{{sum_num}}页</p>
      </div>
    </div>
  </div>
</template>

<script>
import falls from "@/components/basis/falls"
export default {
   components: {
   falls,
  },
  data() {
    return {
      isRouterAlive: true,
      activeClass : 0,
      at_num:1,
      sum_num:1,
      article:[],
      clss:'',
      num:'',
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
    //页数查询
    this.getPage()
  },
  mounted:function(){
    //改变小导航栏激活状态
    if(this.$route.query.sm_class == undefined){
      this.activeClass = 0
    }else{
      this.activeClass = this.$route.query.sm_class
    }
  },
  methods: {
    //页数查询
    getPage:function(){
      //总页数查询
      let url = 'http://localhost:3306/article/list_pno'
      //获取当前页数
      let bg_class = '1'
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
      let url = 'http://localhost:3306/article/list'
      //获取当前页数
      let pno = this.at_num
      let bg_class = '1'
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
          }else{
            alert('获取数据失败')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //参数发生改变时重新执行加载组件的函数
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  },
 
  //监听
  watch: {
      //路由参数发生改变时触发的函数
      $route(){
        this.clss = this.$route.query.sm_class
        if(this.$route.query.sm_class == undefined){
          this.activeClass = 0
        }else{
          this.activeClass = this.$route.query.sm_class
        }
        this.at_num = 1;
        this.getPage()
      }
  },
};
</script>

<style scoped>
.life-title img{
  display: block;
  width: 100%;
}
.life-class{
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

}
.life-class a{
  display: inline-block;
  background: #e0dade;
  color: #666;
  font-size: 1rem;
  letter-spacing: 1px;
  margin-right: 20px;
  padding: 0 30px;
  height: 50px;
  line-height: 50px;
  border-radius: 0 100px 0 100px;
  transition: all .5s;
}
.life-class a:hover{
  background: #e0dade url(/static/img/bg.jpg);
  color: #fff;
}
.life-class .active{
  background: rgba(153, 132, 101, .8) url(/static/img/bg.jpg) !important;
  color: #fff !important;
}
.life-container{
  width: 100%;
  background: #e6c9e2 url(/static/img/bg.jpg);
}

.paging{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30px 10px;
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


@media (max-width: 1200px) {

}
@media (max-width: 750px) {
  .life-class{
    margin-top: 10px;

  }
  .life-class a{
    font-size: .8rem;
    margin-right: 10px;
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    border-radius: 0 50px 0 50px;
    transition: all .5s;
  }
}
</style>
