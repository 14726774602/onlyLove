<template>
  <div>
    <m_loading v-if="hideLoading"></m_loading>
    <div class="page-img animated fadeInDown">
        <img src="/static/img/it/5.png" alt="">
    </div>
    <div class="page-container">
        <div class="left-nav animated fadeInLeft">
            <p>相关文章</p>
            <div>
                <router-link v-for="(key,i) in CorrelationIt" :key="i" :to="'/it_page/it'+key.id+'?sm_class='+key.sm_class+'&id='+key.id" v-if="key.id != $route.query.id">{{key.title}}</router-link>
            </div>
        </div>
        <div class="page-content animated fadeInRight">
            <p class="page-title">{{itContent.title}}</p>
            <p class="page-time">{{itContent.issueTime | dateFormat}}</p>
            <p class="page-intro">{{itContent.intro}}</p>
            <router-view></router-view> 
            <router-link class="page-next" :to="'/it_page/it'+nextCon.id+'?sm_class='+nextCon.sm_class+'&id='+nextCon.id">
              <p>
                <span>下一篇</span>
                <span>{{nextCon.title}}</span>
              </p>
              <svg style="stroke: #4299e1;width:16px;height:50px;" class="qfy-pagination-link-icon" viewBox="0 0 23 48"><g class="svg-icon"> <polyline fill="none" stroke-miterlimit="10" points="1.5,45.7 20.4,23.5 1.5,1.3"></polyline></g></svg>
            </router-link>
            <p class="page-like"><span @click="getLike()">❤（{{itContent.alike}}）</span></p>
            <div class="page-comment">
              <comment v-if="isRouterAlive"></comment>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
import m_loading from "@/components/basis/loading"
import comment from "@/components/basis/comment"
export default {
   components: {
       m_loading,
       comment
  },
  data() {
    return {
      isRouterAlive: true,
      name : 'itPage',
      itContent:'',
      CorrelationIt:[],
      hideLoading:true,
      nextCon:'',
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
    this.getIt()
    this.getCorrelationIt()
  },
  mounted() {
    //页面初始化方法
  },
  methods: {
    //定义方法的地方
    //获取文章
    getIt:function(){
      let url = 'http://api.hjwxl.com:3000/article/item'
      let id = this.$route.query.id
      let that = this
      this.axios.get(url, {
          params: {
            id : id
          }
        })
        .then(function (result) {
          that.itContent = result.data[0]
          that.hideLoading = false;
          that.setlast()
        })
        .catch(function (error) {
          console.log(error);
        }); 

    },
    //获取相关文章
    getCorrelationIt:function(){
      let bg_class = 2;
      let sm_class =  this.$route.query.sm_class
      let id = this.$route.query.id
      let url = 'http://api.hjwxl.com:3000/article/smlist'
      let that = this
      this.axios.get(url, {
          params: {
            id : id,
            bg_class : bg_class,
            sm_class : sm_class
          }
        })
        .then(function (result) {
          that.CorrelationIt = result.data
        })
        .catch(function (error) {
          console.log(error);
        }); 

    },
    //获取点赞
    getLike:function(){
        let nlike = 'it_page' + this.$route.query.id
        let ifLike = this.$cookie.get(nlike)
        let id = this.$route.query.id;
        let url = 'http://api.hjwxl.com:3000/article/getLike'
        let that = this
        this.axios.get(url, {
        params: {
            id : id
        }
        })
        .then(function (result) {
        if(result.data.length > 0){
            if(ifLike == 0 | !ifLike){
                result.data[0].alike+=1
                that.setCookie(nlike,1,.5)
            }else{
                result.data[0].alike-=1
                that.setCookie(nlike,0,.5)
            }
            that.itContent.alike = result.data[0].alike
            that.addLike()
        }else{
            alert('获取数据失败')
        }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    //添加cookie
    setCookie:function(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //添加点赞
    addLike:function(){
        let id = this.$route.query.id;
        let alike = this.itContent.alike;
        let postData = this.qs.stringify({
          id : id,
          alike : alike
        })   
        let that = this;
        this.axios({
            method: 'post',
            url:'http://api.hjwxl.com:3000/article/addLike',
            data:postData
        }).then((res)=>{
            if(res.data.code == 200){
                console.log(res.data.msg)
            }
        })
    },
    //验证当前文章是否为技术第一篇文章
    setlast:function(){
      let url = 'http://api.hjwxl.com:3000/article/last'
      let bg_class = 2
      let id =  this.$route.query.id
      let that = this
      this.axios.get(url, {
          params: {
            bg_class : bg_class
          }
        })
        .then(function (result) {
          if(id == result.data[0].id){
            that.getFirst()
          }else{
            that.getNext()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取当前文章的下一篇文章
    getNext:function(){
      let url = 'http://api.hjwxl.com:3000/article/nextArt'
      let bg_class = 2
      let id =  this.$route.query.id
      let that = this
      this.axios.get(url, {
          params: {
            id : id,
            bg_class : bg_class
          }
        })
        .then(function (result) {
          that.nextCon = result.data[0]
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取第一篇文章
    getFirst:function(){
      let url = 'http://api.hjwxl.com:3000/article/firstArt'
      let bg_class = 2
      let that = this
      this.axios.get(url, {
          params: {
            bg_class : bg_class
          }
        })
        .then(function (result) {
          that.nextCon = result.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //重新加载子组件
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  },
  //监听
  watch: {
      //路由参数发生改变时触发的函数
      $route(){
        this.hideLoading = true;
        this.reload()
        this.getIt()
        this.getCorrelationIt()
      }
  },
};
</script>

<style scoped>
.page-img{
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 5px;
}
.page-img img{
    display: block;
    width: 100%;
}
.page-container{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.left-nav{
    width: 27%;
    padding: 20px;
    background: rgba(250, 250, 250, .8);
    border-radius: 5px;
}
.left-nav p{
    font-size: 1rem;
    line-height: 2;
    letter-spacing: 1px;
    color: #333;
}
.left-nav div{
    padding-left: 10px;
    font-size: .9rem;
    line-height: 1.5;
}
.left-nav div a{
    display: block;
    color: #333;
    padding: 5px 0;
    display:-webkit-box;
    overflow:hidden;
    text-overflow:ellipsis;
    -webkit-line-clamp:1;
    -webkit-box-orient:vertical;
    border-bottom: 1px solid rgba(200, 200, 200, 0);
    transition: all .3s;
    
}
.left-nav div a:hover{
    color: #f00;
    border-bottom: 1px solid rgba(200, 200, 200, 1);
}
.page-content{
    width: 70%;
    padding: 20px;
    background: rgba(250, 250, 250, .8);
    border-radius: 5px;
}
.page-content>p{
    margin-bottom: 10px;
}
.page-title{
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 1px;
    color: #666;
}
.page-time{
    font-size: .8rem;
    color: #111;
    padding-left: 10px;
}
.page-intro{
    padding-left: 10px;
    line-height: 1.5;
    font-size: .9rem;
    color: #222;
}
.page-like{
  text-align: right;
  margin-top: 10px;
  
}
.page-like span{
  font-size: .9rem;
  color: #666;
  transition: all .3s;
  cursor: pointer;
}
.page-like span:hover{
  color: #f00;
}
.page-comment{
  margin-top: 20px;
}
.page-next{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: .9rem;
  color: #4299e1;
  transition: all .5s;
}
.page-next:hover{
  color: blue;
}

.page-next p{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 3px;
}
.page-next p span:last-child{
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width:1000px){
  .left-nav{
    display: none;
  }
  .page-content{
    width: 100%;
  }
}
</style>
