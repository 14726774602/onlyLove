<template>
  <div class="infor-content">
    <div class="my-site">
        <div class="my-photo"><img src="/static/img/photo.png" alt=""></div>
        <div class="my-pandect">
            <router-link to="">文章（<span>{{lengthArticle.length}}</span>）</router-link>
            <router-link to="">相册（<span>{{lengthPhoto.length}}</span>）</router-link>
            <router-link to="">关注（<span>{{lengthVisitor.length}}</span>）</router-link>
        </div>
    </div>
    <div class="a-container">
        <div class="big-title">文章分类</div>
        <div class="a-content">
            <router-link to="/life" class="a-title">生活</router-link>
            <p class="a-class">
              <router-link to="/life?sm_class=1">心情随笔(<span>{{ArticleLife[0]}}</span>)</router-link>
              <router-link to="/life?sm_class=2">旅行见闻(<span>{{ArticleLife[1]}}</span>)</router-link>
              <router-link to="/life?sm_class=3">兴趣资讯(<span>{{ArticleLife[2]}}</span>)</router-link>
            </p>
        </div>
        <div class="a-content">
            <router-link to="/it" class="a-title">技术</router-link>
            <p class="a-class">
              <router-link to="/it?sm_class=1">css(<span>{{ArticleIt[0]}}</span>)</router-link>
              <router-link to="/it?sm_class=2">jquery(<span>{{ArticleIt[1]}}</span>)</router-link>
              <router-link to="/it?sm_class=3">vue-cil(<span>{{ArticleIt[2]}}</span>)</router-link>
              <router-link to="/it?sm_class=4">demo(<span>{{ArticleIt[3]}}</span>)</router-link>
              <router-link to="/it?sm_class=5">animate(<span>{{ArticleIt[4]}}</span>)</router-link>
              <router-link to="/it?sm_class=6">采坑(<span>{{ArticleIt[5]}}</span>)</router-link>
            </p>
        </div>
        <div class="a-content">
            <router-link to="/photo" class="a-title">相册</router-link>
            <p class="a-class">
              <router-link to="/photo?sm_class=1">古韵悠悠(<span>{{photoClass[0]}}</span>)</router-link>
              <router-link to="/photo?sm_class=2">山水之间(<span>{{photoClass[1]}}</span>)</router-link>
              <router-link to="/photo?sm_class=3">独家记忆(<span>{{photoClass[2]}}</span>)</router-link>
            </p>
        </div>
    </div>

    <div class="links-container">
        <div class="big-title">友情链接</div>
        <div class="links-con">
          <router-link to="" class="links-item">
            <p><img src="static/img/photo.png" alt=""></p>
            <p>
              <span>小竹轩的小站</span><br>
              <span>个人采坑分享</span>
            </p>
          </router-link>
          <router-link to="" class="links-item">
            <p><img src="static/img/photo.png" alt=""></p>
            <p>
              <span>轩轩轩的小站</span><br>
              <span>旅行生活记录</span>
            </p>
          </router-link>
          <router-link to="" class="links-item">
            <p><img src="static/img/photo.png" alt=""></p>
            <p>
              <span>竹轩轩的小站</span><br>
              <span>独家学习笔记心得</span>
            </p>
          </router-link>
          <router-link to="" class="more">欢迎更多小伙伴的加入......</router-link>
        </div>
    </div>
    <div class="infor">
        <p>
            <svg t="1588583516524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7634" width="200" height="200"><path d="M972.8 624.64c0-143.36-138.24-261.12-291.84-261.12-163.84 0-291.84 117.76-291.84 261.12s128 261.12 291.84 261.12c30.72 0 66.56-10.24 102.4-20.48l92.16 56.32-25.6-92.16c71.68-51.2 122.88-122.88 122.88-204.8z m-384 0c-25.6 0-51.2-20.48-51.2-51.2 0-25.6 20.48-51.2 51.2-51.2s51.2 20.48 51.2 51.2-20.48 51.2-51.2 51.2z m204.8 0c-25.6 0-51.2-20.48-51.2-51.2 0-25.6 20.48-51.2 51.2-51.2s51.2 20.48 51.2 51.2-20.48 51.2-51.2 51.2z" p-id="7635" fill="#8a8a8a"></path><path d="M353.28 640c0-163.84 143.36-296.96 317.44-296.96h15.36C650.24 204.8 517.12 102.4 363.52 102.4 194.56 102.4 51.2 235.52 51.2 404.48c0 97.28 46.08 174.08 128 240.64l-30.72 107.52L256 691.2c25.6 10.24 76.8 15.36 107.52 20.48-5.12-20.48-10.24-46.08-10.24-71.68z m112.64-394.24c35.84 0 66.56 30.72 66.56 66.56s-30.72 66.56-66.56 66.56-66.56-30.72-66.56-66.56 30.72-66.56 66.56-66.56zM256 378.88c-35.84 0-66.56-30.72-66.56-66.56s30.72-66.56 66.56-66.56 66.56 30.72 66.56 66.56-30.72 66.56-66.56 66.56z" p-id="7636" fill="#8a8a8a"></path></svg>
            <span>微 信：{{infor.wx}}</span>
        </p>
        <p>
           <svg t="1588583532716" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8498" width="200" height="200"><path d="M116.435 593.714c-33.54 78.964-38.985 154.297-12.059 168.37 18.572 9.696 47.686-12.382 74.936-52.909 10.791 44.157 37.493 84.137 75.633 116.21-40.004 14.768-66.135 38.886-66.135 66.232 0 44.954 70.709 81.302 157.978 81.302 78.716 0 143.907-29.538 155.94-68.371 3.232-0.049 15.663-0.049 18.796 0 12.083 38.784 77.324 68.371 155.989 68.371 87.267 0 157.978-36.398 157.978-81.302 0-27.297-26.105-51.464-66.135-66.232 38.089-32.123 64.889-72.053 75.631-116.21 27.251 40.527 56.29 62.605 74.887 52.909 26.95-14.073 21.631-89.456-12.032-168.37-26.355-62.058-62.11-107.754-89.457-117.848 0.398-3.929 0.596-7.958 0.596-11.935 0-23.968-6.661-46.146-18.049-64.196 0.199-1.393 0.199-2.834 0.199-4.227 0-11.038-2.636-21.381-7.114-30.332-6.909-161.309-111.93-289.402-281.866-289.402-170.036 0-275.106 128.093-281.943 289.402-4.525 9.001-7.135 19.343-7.135 30.332 0 1.393 0.099 2.835 0.15 4.227-11.288 18.05-17.951 40.178-17.951 64.196 0 3.978 0.15 7.955 0.498 11.935-27.151 10.094-63.028 55.841-89.333 117.848z" fill="#8a8a8a" p-id="8499"></path></svg>
            <span>Q Q：{{infor.qq}}</span>
        </p>
        <p>
            <svg t="1588583487235" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6704" width="200" height="200"><path d="M886.3 299.8l-381.1 220-371.6-214.6c3.6-56.2 50.3-100.7 107.4-100.7h538.3c55.3 0 100.9 41.6 107 95.3z m0.7 78.8v334.9c0 59.5-48.2 107.7-107.7 107.7H241c-59.5 0-107.7-48.2-107.7-107.7V384.3l354.9 204.9c12.2 7 26.9 5.7 37.5-2.1 0.5-0.2 0.9-0.5 1.4-0.8L887 378.6z" p-id="6705" fill="#8a8a8a"></path></svg>
            <span>邮 箱：{{infor.email}}</span>
        </p>
    </div>
    
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
      time : '个人信息',
      infor:{
          wx:'zhuxuan123',
          qq:123456789,
          email:'zhuxuan@.com',
      },
      lengthArticle:'',
      lengthPhoto:'',
      lengthVisitor:'',
      lifeCon:[],
      itCon:[],
      photoCon:[],
      friend_link:[],
      ArticleLife:[0,0,0],
      ArticleIt:[0,0,0,0,0,0],
      photoClass:[0,0,0]
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
    this.getLengthArticle()
    this.getLengthPhoto()
    this.getLengthVisitor()
  },
  mounted() {
    //页面初始化方法
  },
  methods: {
    //定义方法的地方
    //获取文章内容长度
    getLengthArticle:function(){
      let url = 'http://localhost:3306/article/length'
      let that = this
      this.axios.get(url, {
          params: {}
        })
        .then(function (result) {
          that.lengthArticle = result.data
          that.articleClass()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取相册内容长度
    getLengthPhoto:function(){
      let url = 'http://localhost:3306/photo/length'
      let that = this
      this.axios.get(url, {
          params: {}
        })
        .then(function (result) {
          that.lengthPhoto = result.data
          that.photoSm_class()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取游客内容长度
    getLengthVisitor:function(){
      let url = 'http://localhost:3306/visitor/length'
      let that = this
      this.axios.get(url, {
          params: {}
        })
        .then(function (result) {
          that.lengthVisitor = result.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //文章分类
    articleClass:function(){
      for(let i = 0;i<this.lengthArticle.length; i++){
        if(this.lengthArticle[i].bg_class == 1){
          this.ArticleLife[this.lengthArticle[i].sm_class-1]+=1
        }else if(this.lengthArticle[i].bg_class == 2){
          this.ArticleIt[this.lengthArticle[i].sm_class-1]+=1
        }
      }
    },
    //相册分类
    photoSm_class:function(){
      for(let i = 0;i<this.lengthPhoto.length; i++){
          this.photoClass[this.lengthPhoto[i].sm_class-1]+=1
      }
    }
  } 
};
</script>

<style scoped>
.infor-content{
    padding:0 0 0.5rem;
}
.infor,.my-site,.a-container,.links-container{
    padding: 30px 10px;
    background: rgba(250, 250, 250, .8);
    margin-bottom: 10px;
}
.my-photo{
    width: 80px; 
    height: 80px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 5px;
    cursor: pointer;
}
.my-photo img{
    width: 100%;
    display: block;
    transition: all .5s;
}
.my-site .my-photo:hover img{
    transform:rotate(360deg) scale(1.1);
}
.my-pandect{
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #999;
}
.my-pandect a{
    font-size: .9rem;
    display: block;
    padding: 10px 0 5px;
    color: #bbb;
    transition: all .5s;
    text-align: center; 
}
.my-pandect a span{
    color: #999;
    transition: all .5s;
}
.my-pandect a:hover,.my-pandect a:hover span{
    color: #f00;
}

.infor p{
    display: flex;
    align-items: center;
    color: #bbb;
    font-size: .9rem;
    line-height: 1.5;
    padding: 5px 0;
    border-bottom: 1px solid #fff;
    transition: all .8s;
}
.infor p:hover {
    border-bottom: 1px solid #999;
    color: #333;
}
.infor p svg{
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
}
.big-title{
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}
.a-content{
  padding-left: 30px;
  margin-top: 20px;
}
.a-title{
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  cursor: pointer;
}

.a-content:hover .a-title{
  color: #f00;
}
.a-class{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.a-class a{
  color: #666;
  font-size: .9rem;
  line-height: 1.5;
  margin-left: 10px;
  transition: all .5s;
}
.a-class a span{
  color: #333;
  transition: all .5s;
}
.a-class a:hover,
.a-class a:hover span,
.a-class .router-link-exact-active,
.a-class .router-link-exact-active span{
  color: #f00;
}

.links-con{
  padding: 0 20px 0;
} 

.links-item{
  margin-top: 20px;
  min-width: 30%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding-bottom: 10px;
  border-bottom: 1px solid #fff;
  transition: all .5s;
}
.links-item:hover{
  border-bottom: 1px solid #999;
}
.links-item p:first-child{
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 10px;
}
.links-item p:first-child img{
  display: block;
  width: 100%;
  transition: all .5s;
}
.links-item:hover p:first-child img{
  transform:rotate(360deg) scale(1.1);
}

.links-item p:last-child{
  font-size: .8rem;
  line-height: 1.5;
  letter-spacing: 1px;
  color: #999;
  transition: all .5s;
}
.links-item p:last-child span:first-child{
  font-size: .9rem;
  color: #333;
}
.links-item:hover p{
  color: #f00;
}

.more{
  display: block;
  margin-top: 20px;
  font-size: .8rem;
  line-height: 2;
  color: #333;
  text-align: right;
  transition: all .5s;
}
.more:hover{
  color: #f00;
}
</style>
