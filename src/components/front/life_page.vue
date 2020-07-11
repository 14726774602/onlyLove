<template>
  <div>
    <m_loading v-if="hideLoading"></m_loading>
    <div class="page-swiper animated fadeInDown" v-if="img_con.length >= 2">
      <page_swiper v-if="isRouterAlive" :deta="img_con"></page_swiper>
    </div>
    <div class="page-img img-2 animated fadeInDown" v-if="img_con.length == 1">
      <p>
        <img :src="img_con[0]" alt="">
      </p>
    </div>
    <div class="page-container animated fadeInUp">
      <div class="page-content">
        <div class="p-title">{{article.title}}</div>
        <div class="p-time">发布时间 <span>{{article.issueTime | dateFormat}}</span></div> 
        <div class="p-text" v-html="article.content"></div> 
        <div class="p-like">
          <span @click="getLike()">❤（{{article.alike}}）</span>
        </div>
      </div>
    </div> 
    <div class="cut-page animated fadeInUp">
      <p v-if="firstArticle"></p>
      <router-link v-if="!firstArticle" :to="'/life_page?id='+prevCon.id" class="prev">
        <svg style="	stroke: #4299e1;  width:16px;height:50px;" class="qfy-pagination-link-icon" viewBox="0 0 23 48"><g class="svg-icon"> <polyline fill="none" stroke-miterlimit="10" points="21.5,1.3 2.6,23.4 21.5,45.7 "></polyline></g></svg>
        <p>
          <span>上一篇</span>
          <span>{{prevCon.title}}</span>
        </p>
      </router-link>
      <p v-if="lastArticle"></p>
      <router-link v-if="!lastArticle" :to="'/life_page?id='+nextCon.id" class="next">
        <p>
          <span>下一篇</span>
          <span>{{nextCon.title}}</span>
        </p>
        <svg style="stroke: #4299e1;width:16px;height:50px;" class="qfy-pagination-link-icon" viewBox="0 0 23 48"><g class="svg-icon"> <polyline fill="none" stroke-miterlimit="10" points="1.5,45.7 20.4,23.5 1.5,1.3"></polyline></g></svg>
      </router-link>
    </div>
    <div class="page-comment">
      <comment v-if="isRouterAlive"></comment>
    </div>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
import page_swiper from "@/components/basis/page_swiper"
import m_loading from "@/components/basis/loading"
import comment from "@/components/basis/comment"
export default {
   components: {
     page_swiper,
     m_loading,
     comment
  },
  data() {
    return {
      isRouterAlive: true,
      time : '文章内页',
      article:{},//文章内容
      img_con:[],
      count:0,
      hideLoading:true,
      firstArticle:false,
      lastArticle:false,
      prevCon:{
        id:'',
        title:''
      },
      nextCon:{
        id:'',
        title:''
      }      
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
    this.getArticle()
  },
  methods: {
    //定义方法的地方
    //添加cookie
    setCookie:function(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //获取点赞
    getLike:function(){
        let nlike = 'life_page' + this.$route.query.id
        let ifLike = this.$cookie.get(nlike)
        let id = this.$route.query.id;
        let url = 'http://localhost:3306/article/getLike'
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
            that.article.alike = result.data[0].alike
            that.addLike()
        }else{
            alert('获取数据失败')
        }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    //添加点赞
    addLike:function(){
        let id = this.$route.query.id;
        let alike = this.article.alike;
        let postData = this.qs.stringify({
          id : id,
          alike : alike
        })   
        let that = this;
        this.axios({
            method: 'post',
            url:'http://localhost:3306/article/addLike',
            data:postData
        }).then((res)=>{
            if(res.data.code == 200){
                console.log(res.data.msg)
            }
        })
    },
    //图片预加载的方法
    preload: function() {
      //初始化图片预加载
      this.hideLoading = true;
      this.count = 0;
      for (let img of this.img_con) {
        let image = new Image()
        image.src = img
        image.onload = () => {
          this.count++
        }
      }
    },
    //获取文章内容
    getArticle:function(){
      let url = 'http://localhost:3306/article/item'
      let id = this.$route.query.id
      let that = this
      this.axios.get(url, {
          params: {
            id : id
          }
        })
        .then(function (result) {
          that.article = result.data[0]
          that.sepImg(that.article.img_url)
          that.setFirst()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //拆分文章图片  
    sepImg:function(str){
      let arr = str.split(',')
      this.img_con = arr
      this.reload ()
      this.preload()
    },
    //查询当前文章是否是最后一篇或者第一遍
    setFirst:function(){
      let url = 'http://localhost:3306/article/first'
      let bg_class = this.article.bg_class
      let that = this
      this.axios.get(url, {
          params: {
            bg_class : bg_class
          }
        })
        .then(function (result) {
          if(that.article.id == result.data[0].id){
            that.firstArticle = true
          }else{
            that.firstArticle = false
          }
          that.setlast()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setlast:function(){
      let url = 'http://localhost:3306/article/last'
      let bg_class = this.article.bg_class
      let that = this
      this.axios.get(url, {
          params: {
            bg_class : bg_class
          }
        })
        .then(function (result) {
          if(that.article.id == result.data[0].id){
            that.lastArticle = true
          }else{
            that.lastArticle = false
          }
          that.getPrevNext()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取文章上一篇和下一篇的id
    getPrevNext:function(){
        let url = 'http://localhost:3306/article/preNext'
        let id = this.article.id
        let bg_class = this.article.bg_class
        let that = this
        this.axios.get(url, {
            params: {
              id : id,
              bg_class : bg_class
            }
          })
          .then(function (result) {
            if(that.firstArticle){
              if(!that.lastArticle){
                that.nextCon = result.data[0]
              }
            }else{
              if(that.lastArticle){
                that.prevCon = result.data[0]
              }else{
                //console.log(result.data)
                that.prevCon = result.data[0]
                that.nextCon = result.data[1]
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  },
  watch: {
    //监听预加载
    count: function(val) {
      if(val  == this.img_con.length && val != 0){
        let that = this
        let timeId = setTimeout(function(){
          that.hideLoading = false;
        },500)
      }
    },
    '$route' (to, from) { //监听路由是否变化
		  if(to.query.id != from.query.id){
			  this.id = to.query.id;
			  this.getArticle();//重新加载数据
		  }
	  }
  }
  
 
};
</script>

<style scoped>
.page-img {
  padding: 1rem;
}
.page-img p{
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  border-radius: 5px;
  transition: all .5s;
  -webkit-box-shadow: rgba(200,200,200,0) 0px 5px 5px;
  -moz-box-shadow: rgb(200,200,200,0) 0px 5px 5px;
  box-shadow: rgba(200,200,200,0) 0px 5px 5px;
}
.page-img img{
  display: block;
  width: 100%;
  transition: all .5s;
}
.page-img p:hover{
  -webkit-box-shadow: rgba(200,200,200,.8) 0px 5px 5px;
  -moz-box-shadow: rgb(200,200,200,.8) 0px 5px 5px;
  box-shadow: rgba(200,200,200,.8) 0px 5px 5px;
}
.page-img p:hover img{
  transform: scale(1.2);
}

.page-container{
  margin-top: 20px;
}

.page-content{
  background: rgba(250,250,250,.8);
  max-width: 800px ;
  margin: 0 auto ;
  padding: 1rem;
  border-radius: 5px;
}

.p-title{
  font-size: 1.5rem;
  line-height: 2;
  font-weight: bold;
  color: #000;
  text-align: center;
}
.p-time{
  font-size: .8rem;
  color: #666;
  text-align: center;
  line-height: 1.5;
}
.p-time span{
  color: #f00;  
}
.p-text {
  margin-top: 20px;
  font-size: .9rem;
  line-height: 1.5;
  color: #333;
  text-indent: 1.8rem;
}
.p-like{
  margin-top: 20px;
  text-align: right;
  font-size: 1rem;
  color: #999;
  cursor: pointer;
  transition: all .3s;
}
.p-like:hover{
  color: #f00;
}
.cut-page,.page-comment{
  margin: 20px auto 0;
  width: 100%;
  max-width: 800px;
  padding: 15px 10px;
  border-radius: 5px;
  background: rgba(250,250,250,.8);
} 
.cut-page{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cut-page a{
  display: flex;
  align-content: center;
  color: #4299e1;
  font-size: .9rem;
  transition: all .5s;
}
.cut-page a:hover{
  color: blue;
}
.cut-page a p{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.cut-page a:first-child svg{
  margin-right: 3px;
}
.cut-page a:last-child svg{
  margin-left: 3px;
}
.prev p span:last-child,.next p span:last-child{
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 750px) {
  .page-container{
    margin-top: 10px;
  }
  .cut-page,
  .page-comment{
    margin: 10px auto 0;
  }
  .cut-page a:hover{
    color: #4299e1;
  }
}

</style>

<style>
.p-text p{
  margin-top: 10px;
}
.p-text span{
  display: block;
  font-size: 1rem;
  color: #000;
  font-weight: bold;
  margin: 20px 0 0 -1.8rem;
}

</style>
