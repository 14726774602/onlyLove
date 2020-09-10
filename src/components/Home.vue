<template>
  <div id="Home">
    <div class="container top-container">
      <div class="top-nav content">
        <div class="nav-content" @click="hideNav">
          <router-link :class="activeClass == 'index' ? 'active':''" to="/" >主页</router-link>
          <router-link :class="activeClass == 'life' ? 'active':''" to="/life" >生活</router-link>
          <router-link :class="activeClass == 'it' ? 'active':''" to="/it" >技术</router-link>
          <router-link :class="activeClass == 'photo' ? 'active':''" to="/photo">相册</router-link>
          <router-link :class="activeClass == 'my' ? 'active':''" to="/my" >关于我</router-link>
          <!-- <router-link class="search" to="/search" ><img src="/static/img/search_blank.png" alt=""></router-link> -->
          <svg t="1588668859179" class="icon hide-menu" @click="hideNav" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10659" width="200" height="200"><path d="M767.98 815.98c-12.31 0-24.56-4.69-33.94-14.06l-512-512c-18.75-18.75-18.75-49.12 0-67.88s49.13-18.75 67.88 0l512 512c18.75 18.75 18.75 49.12 0 67.88-9.38 9.38-21.63 14.06-33.94 14.06z" fill="#8a8a8a" p-id="10660"></path><path d="M255.98 815.98c-12.31 0-24.56-4.69-33.94-14.06-18.75-18.75-18.75-49.12 0-67.88l512-512c18.75-18.75 49.12-18.75 67.88 0s18.75 49.12 0 67.88l-512 512c-9.38 9.38-21.63 14.06-33.94 14.06z" fill="#8a8a8a" p-id="10661"></path></svg>
        </div>
        <svg t="1588586723731" class="icon show-menu" @click="showNav" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9714" width="200" height="200"><path d="M216.9856 315.2896m-32.768 0a32.768 32.768 0 1 0 65.536 0 32.768 32.768 0 1 0-65.536 0Z" p-id="9715"></path><path d="M806.912 282.5216H348.16c-18.1248 0-32.8704 14.7456-32.8704 32.8704 0 18.1248 14.7456 32.8704 32.8704 32.8704h458.752c18.1248 0 32.8704-14.7456 32.8704-32.8704 0-18.1248-14.7456-32.8704-32.8704-32.8704z" p-id="9716"></path><path d="M216.9856 512.1024m-32.768 0a32.768 32.768 0 1 0 65.536 0 32.768 32.768 0 1 0-65.536 0Z" p-id="9717"></path><path d="M806.912 479.3344H348.16c-18.1248 0-32.8704 14.7456-32.8704 32.8704 0 18.1248 14.7456 32.8704 32.8704 32.8704h458.752c18.1248 0 32.8704-14.7456 32.8704-32.8704 0-18.1248-14.7456-32.8704-32.8704-32.8704z" p-id="9718"></path><path d="M216.9856 708.5056m-32.768 0a32.768 32.768 0 1 0 65.536 0 32.768 32.768 0 1 0-65.536 0Z" p-id="9719"></path><path d="M806.912 675.7376H348.16c-18.1248 0-32.8704 14.7456-32.8704 32.8704 0 18.1248 14.7456 32.8704 32.8704 32.8704h458.752c18.1248 0 32.8704-14.7456 32.8704-32.8704 0-18.1248-14.7456-32.8704-32.8704-32.8704z" p-id="9720"></path></svg>
        <svg v-if="isShow" @click="back" t="1591102969148" class="icon return" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7790" width="200" height="200"><path d="M274.510074 461.204104c130.168642-125.846196 260.332167-251.684206 390.490575-377.400442 53.595662-51.864228 133.49848 32.354895 79.653131 84.346013-115.838262 112.008027-231.6755 223.893256-347.450317 335.904353C513.596358 619.888196 629.989251 735.852324 746.444567 851.690586c52.978609 52.733015-26.921139 136.953162-79.712483 84.282568C535.946388 805.873074 405.233348 675.710572 274.510074 545.546024 252.90194 523.93789 252.342192 482.563574 274.510074 461.204104L274.510074 461.204104zM274.510074 461.204104" p-id="7791" fill="#2197ef"></path></svg>
        <router-link v-if="!online" to="/Login" class="blog">
          <img class="log" src="/static/img/log.png" alt="">
          <p>
            <span>登录/注册</span>
          </p>
        </router-link>
        <div v-if="online" class="blog">
          <img class="log" :src="userinfo.img_url" alt="">
          <p>
            <router-link to="/Intro">{{userinfo.uname}}</router-link>
            <span @click="quiteAlert = true">退出</span>
          </p>
        </div>
        <div v-if="quiteAlert" class="quite-alert">
          <div>
            <p>确定退出该账号 <span>{{userinfo.uname}}</span> 吗？</p>
            <p>
              <span @click="quitLogin(),quiteAlert = false">确定</span>
              <span @click="quiteAlert = false">取消</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="subject container">
      <div class="content">
       <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <span>京ICP备 1010101010 号</span>
      <a target="_blank" href="#">京公网安备 1010101010101010 号</a>
    </div>
    <div class="banner" :style="{backgroundImage: 'url(' + banner_url + ')'}">
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return{
      //是否显示返回按钮
      isShow:false,
      activeClass : 0,
      banner:{
        index:'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner1.jpg',
        life:'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner2.jpg',
        it:'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner3.jpg',
        photo:'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner4.jpg',
        my:'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner5.jpg',
        life_page:'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner6.jpg',
        photo_page:'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner8.jpg',
        it_page:'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner9.jpg',
        intro:'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner9.jpg'
      },
      banner_url:'/static/img/banner1.jpg',
      online:false,
      nname:'',
      upwd:'',
      userinfo:{},
      quiteAlert:false
    } 
  },
  created() {
    this.activeClass = this.$route.name;
  },
  mounted(){
    this.cutBanner()
    this.getCookie()
    
  },
  
  methods: {
    //解密
    decode:function(){

    },
    //设置cookie 的值
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        //console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        //console.info(document.cookie);
    },
    //获取cookie
    getCookie: function (cname) {
      //console.log(document.cookie)
      this.nname = this.$cookie.get('nname');
      let epwd = this.$cookie.get('epwd');
      //判断cookie是否为空
      if(!this.nname && !epwd){
        this.online = false
      }else{
        this.online = true
        let arr = epwd.split(',')
        for(let i = 0;i<arr.length;i++){
          arr[i] = arr[i].slice(16)
          arr[i] = String.fromCharCode(arr[i])
        }
        this.upwd = arr.join('')
        let postData = this.qs.stringify({
            nname : this.nname,
            upwd : this.upwd
        })   
        let me = this;
        this.axios({
            method: 'post',
            url:'http://api.hjwxl.com:3000/visitor/gain',
            data:postData
        }).then((res)=>{
          if(res.data.length > 0){
            this.userinfo = res.data[0]
            this.setCookie('uname', this.userinfo.uname, 1)
          }
        })
      }
    },
    //退出登录
    quitLogin:function(){
        this.online = false;
        this.userinfo = {};
        this.setCookie('nname', "", -1)
        this.setCookie('epwd', "", -1)
        this.setCookie('uname', "", -1)
        alert('退出成功！')
    },
    showNav:function(){
      $('.nav-content').css('right','0')
    },
    hideNav:function(){
      $('.nav-content').css('right','-200px')
    },
    cutBanner:function(){
      let rot = this.$route.path.split('/')[1]
      if(!rot){
        rot = 'index'
      } 
      let arr = this.banner
      for(let key in arr){
        if(key == rot){
         this.banner_url = arr[key]
        }
      }      
    },
    back(){
        this.$router.go(-1);//返回上一层
    },
  },
  watch: {
    $route(now,old){     //监控路由变换，控制返回按钮的显示
      if(now.path=="/"){
              this.isShow=false;
      } else{
          this.isShow=true;
      }
      this.activeClass = this.$route.name
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.cutBanner()
    }
  },
}
</script>

<style scoped>  
  .top-container{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgb(250, 250, 250,.8);
  }
  #home{
    overflow: hidden;
  }
  .top-nav{
    height: 80px;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
  }
  .return{
    display: none;  
  }
  .blog{
    float: left;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .blog span,
  .blog a{
    letter-spacing: 1px;
    font-size: 1.2rem;
    font-weight: bold;
    background: linear-gradient(to right,#fd9829,#a65ea5,#f00);
    -webkit-background-clip: text;
    color: transparent;
    display: block;
  }
  .blog a{
    margin-bottom: 5px;
  }
  .blog img{
    display: block;
    width: 60px;
    border-radius: 50%;
    margin-right: 10px;
  }
  div.blog span:last-child{
    color: #999;
    font-weight: 400;
    font-size: .8rem;
    cursor: pointer;
  }
  .search{
    display: flex;
    align-items: center;
  }
  .search img{
    width: 20px;
  }
  .nav-content{
    float:right;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .nav-content a{
    font-size: 1rem;
    color: #212529;
    line-height: 2;
    letter-spacing: 1px;
    margin-left: 50px;
    font-weight: bold;
    transition: all .5s;
  }
   .nav-content a:hover{
     color: #f00;
   }
  .active{
    color: #f00 !important;
  }
  .show-menu{
    float: right;
    width: 40px;
    height: 40px;
    margin-top: 10px;
    display: none;
    cursor: pointer;
  }
  .subject{
    padding: 120px 0 40px;
    /* background: rgba(203, 189, 210, .5); */
    position: relative;
  }
  .hide-menu{
    display: none;  
    width: 25px;
    height: 25px; 
    position: absolute;
    top: 0;
    left: 0;  
    cursor: pointer;
  }
  .footer{
    position: relative;
    z-index: 2;
    background: rgba(250, 250, 250, .8);
    padding: 30px 0;
    text-align: center; 
  }
  .footer span{
    color: #666;
    font-size: .8rem;
    display: block;
    line-height: 2;
  }
  .footer a{
    color: #666;
    font-size: .8rem;
    display: block;
    line-height: 2;
  }
  .footer a:hover{
    color: #f00;
  }



  .banner{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #CBBED2;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover; 
    z-index: -1;
    transition: all 1s;
  }

  /* 退出框 */
  .quite-alert{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
  }
  .quite-alert div{
    max-width: 400px;
    width: 90%;
    padding: 30px 20px;
    border-radius: 10px;
    background: rgba(21, 17, 17, .8);
  }
  .quite-alert div p{
    text-align: center;
    font-size: 1rem;
    color: #fff;line-height: 1.5;
  }
  .quite-alert div p:first-child span{
    background: linear-gradient(to right,#fd9829,#a65ea5,#f00);
    -webkit-background-clip: text;
    color: transparent;
  }
  .quite-alert div p:last-child{
    margin-top: 20px;
  }
  .quite-alert div p:last-child span{
    cursor: pointer;
    display: inline-block;
    height: 30px;
    padding: 0 30px;
    border-radius: 30px;
    line-height: 30px;
    margin: 0 20px;
    background: linear-gradient(to right,#50a2fd,#21c8fb,#00e2fa);
  }
  .quite-alert div p:last-child span:hover{
    background: linear-gradient(to right,#4e26f3,#5b70ce,#50a2fd);
  }

   @media (max-width:1000px){
     .top-nav{
       height: 60px;
     }
     
     .subject{
        padding: 80px 0 40px;
      }
     .nav-content{
       position: fixed;
       top: 0;
       right: -200px;
       flex-direction: column;
       align-items: flex-start;
       justify-content: flex-start;
       background: rgba(240, 240, 240, .8);
       padding: 30px 30px;
       z-index: 200;
       transition: all .8s;
     }
     .hide-menu{
       display: block;
     }
     .nav-content a{
       width: 80px;
       margin: 0;
       padding-top: 10px;
       border-bottom: 1px solid #fff;
       transition: all .8s;
     }
     .nav-content a:hover{
       border-bottom: 1px solid #333;
       color: #f00;
     }
    .show-menu{
      display: block;
     }

   }
   @media(max-width: 750px){
     .return{
      display: block;
      width: 30px;
      height: 30px;
      margin-top: 15px;
      float: left;
      cursor: pointer;
    }
    .subject{
      padding: 70px 0 20px;
    }
   }
</style>
