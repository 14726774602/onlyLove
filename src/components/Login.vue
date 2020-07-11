<template>
  <div class="log-container">
      <m_loading v-if="hideLoading"></m_loading>
      <router-link to="/" class="index">
        <img src="/static/img/log.png" alt="">
      </router-link>
      <div class="banner"></div>
      <div class="log-content">
        <div class="log-input">
          <p v-if="!logReg">
            <span>用户名：</span>
            <input id="uname" @blur="animateWidth('uname')" type="text" placeholder="请输入用户名">
            <span class="warn">{{warn_uname}}</span>
          </p>
          <p>
            <span>账 号：</span>
            <input id="nname" @blur="animateWidth('nname')" type="text" placeholder="请输入用户账号">
            <span class="warn">{{warn_nname}}</span>
          </p>
          <p>
            <span>密 码：</span>
            <input id="upwd" @blur="animateWidth('upwd')" :type="pwdType" placeholder="请输入密码">
            <svg v-if="!showEye" @click="showUpwd(),showEye = !showEye" t="1590740051933" class="icon eye" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3010" width="200" height="200"><path d="M954.432 354.624a34.688 34.688 0 0 0-6.4-44.992c-14.4-11.264-33.664-8.064-44.864 6.4-1.6 1.6-179.456 212.224-390.976 212.224-205.12 0-390.976-212.224-392.576-213.824a32.448 32.448 0 0 0-44.864-3.2 32.704 32.704 0 0 0-3.2 44.992c3.136 4.864 41.6 48.256 102.528 96.448L92.352 537.92a31.168 31.168 0 0 0 1.6 44.992c3.2 6.4 11.2 9.664 19.2 9.664a31.36 31.36 0 0 0 22.4-9.664l88.128-91.648a623.168 623.168 0 0 0 145.792 75.52l-33.6 114.176a32.128 32.128 0 0 0 22.464 40.192h9.6a30.976 30.976 0 0 0 30.464-24.128l33.6-114.112c25.664 4.8 52.864 8.064 80.128 8.064 27.264 0 54.464-3.2 80.128-8.064l33.664 112.512c3.2 14.464 17.6 24.128 30.464 24.128 3.2 0 6.4 0 8-1.6a32.192 32.192 0 0 0 22.464-40.192l-33.664-112.512a620.864 620.864 0 0 0 145.792-75.584l86.528 90.048c6.4 6.4 14.4 9.664 22.464 9.664a31.36 31.36 0 0 0 22.4-9.664 32.64 32.64 0 0 0 1.6-44.992l-81.728-85.184c65.728-48.256 104.192-94.912 104.192-94.912z" p-id="3011" fill="#2ac1fc"></path></svg>
            <svg v-if="showEye" @click="showUpwd(),showEye = !showEye" t="1590740104107" class="icon eye" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4447" width="200" height="200"><path d="M518.826667 763.733333c-98.190222 0-177.777778-79.587556-177.777778-177.777777s79.587556-177.777778 177.777778-177.777778 177.777778 79.587556 177.777777 177.777778-79.587556 177.777778-177.777777 177.777777z m0-99.555555a78.222222 78.222222 0 1 0 0-156.444445 78.222222 78.222222 0 0 0 0 156.444445z" p-id="4448" fill="#2ac1fc"></path><path d="M522.467556 814.520889c124.529778 0 249.287111-73.244444 374.357333-224.199111-109.155556-151.054222-233.244444-224.241778-374.357333-224.241778-141.255111 0-269.909333 73.329778-387.569778 224.284444 133.575111 150.798222 262.869333 224.156444 387.569778 224.156445z m373.063111-380.344889c36.750222 37.432889 71.68 81.038222 104.803555 130.744889l19.911111 29.880889-22.087111 28.330666C848.284444 815.317333 689.706667 914.062222 522.467556 914.062222c-166.684444 0-329.742222-98.176-489.571556-289.664L8.149333 594.773333l22.570667-31.331555c44.743111-62.122667 91.818667-114.673778 141.169778-157.482667l-84.337778-89.827555a35.555556 35.555556 0 1 1 51.84-48.668445l88.789333 94.577778c51.342222-35.726222 104.96-61.525333 160.768-77.226667l-43.079111-101.674666a35.555556 35.555556 0 1 1 65.479111-27.733334l48.739556 115.000889a499.527111 499.527111 0 0 1 62.378667-3.868444c36.508444 0 72.007111 3.882667 106.481777 11.619555l56.945778-125.297778a35.555556 35.555556 0 0 1 64.739556 29.44l-53.105778 116.821334c51.043556 19.911111 99.612444 48.938667 145.621333 86.897778l103.936-103.950223a35.555556 35.555556 0 0 1 50.289778 50.289778l-101.831111 101.831111z" p-id="4449" fill="#2ac1fc"></path></svg>
            <span class="warn">{{warn_upwd}}</span>
          </p>
          <div class="log-btn">
            <span class="login" v-if="logReg" @click="logBtn()">登 录</span>
            <span class="login" v-if="!logReg" @click="regBtn()">注 册</span>
            <span class="select" v-if="!logReg" @click="logReg=!logReg">登 录</span>
            <span class="select" v-if="logReg" @click="logReg=!logReg">注 册</span>
          </div>
          <div class="hint">
            温馨提示：忘记密码了，只能重新注册哦！！！
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
import m_loading from "@/components/basis/loading"
export default {
   components: {
      m_loading
  },
  data() {
    return {
      hideLoading:true,
      name : '登录注册',
      logReg:true,
      warn_uname:'',
      warn_nname:'',
      warn_upwd:'',
      log_blur:false,
      reg_blur:false,
      uname:'',
      nname:'',
      upwd:'',
      epwd:'',
      showEye:false,
      pwdType:'password'
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
    //this.verifyNname()
    //this.setCookie('nname','12345678910',3)
    
  },
  methods: {
    //定义方法的地方
    //图片预加载的方法
    preload: function() {
        let image = new Image()
        image.src = 'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner7.jpg'
        image.onload = () => {
            this.hideLoading = false
        }
    },
    //显示隐藏密码
    showUpwd:function(){
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
    },
    //域名跳转
    skip:function(){
      this.$router.push({path: '/index'});
    },
    //密码加密
    encryption:function(upwd){
      let arr = upwd.split('')
      let larr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      for(let i = 0;i<arr.length;i++){
        let pre = ''
        for(var a=0; a<16; a++){
          let pos = Math.round(Math.random() * (larr.length-1));
          pre += larr[pos];
        }
        arr[i] =  arr[i].charCodeAt(0)
        arr[i] =  pre + arr[i]
      }
      this.epwd = arr.join(',')
    },
    //添加cookie
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        //console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        //console.info(document.cookie);
    },

    //账号验证
    verifyNname:function(num){
      let me = this; 
      let url = 'http://localhost:3306/visitor/verify'
      this.axios.get(url, {
      params: {
            nname: num
          }
        })
        .then(function (result) {
          if(result.data.code == 401){
            me.warn_nname = "*账号已存在，请重新输入"
            alert("*账号已存在，请重新输入")
            me.nname = ''
            return
          }else{
            me.nname = num
            return
          }
        })
        .catch(function (error) {
          console.log(error);
      });
    },
    animateWidth:function(name){
      if(name == 'uname'){
        if($('#'+name).val() == ''){
          this.warn_uname = "*用户名不能为空"
          this.uname = ''
        }else{
          let reg = /^[\u4e00-\u9fa5_a-zA-Z_]{1,16}$/
          if(reg.test($('#'+name).val())){
            //console.log('满足条件')
            this.warn_uname = ""
            this.uname = $('#'+name).val();
          }else{
            this.warn_uname = "*用户名格式错误"
            this.uname = ''
          }
        }
      }else if(name == 'nname'){
        if($('#'+name).val() == ''){
          this.warn_nname = "*账号不能为空"
          this.nname = ''
        }else{
          let reg = /^[0-9]{6,11}$/
          if(reg.test($('#'+name).val())){
            this.warn_nname = ""
            if(!this.logReg){
              this.verifyNname($('#'+name).val())
            }else{
              this.nname = $('#'+name).val()  
            }
          }else{
            this.warn_nname = "*账号为6-11位数字"
            this.nname = ''
          }
        }
      }else if(name == 'upwd'){
        if($('#'+name).val() == ''){
          this.warn_upwd = "*密码不能为空"
          this.upwd = '';
        }else{
          let reg = /^(\w){6,16}$/
          if(reg.test($('#'+name).val())){
            this.warn_upwd = ""
            this.upwd = $('#'+name).val();
          }else{
            this.warn_upwd = "*密码只能为6-16位字母、数字或下划线"
            this.upwd = '';
          }
        }
      }
    },
    //登录
    logBtn:function(){
      this.animateWidth('nname')
      this.animateWidth('upwd')
      let nname = this.nname;
      let upwd = this.upwd;
      if(nname != '' && upwd != ''){
          let postData = this.qs.stringify({
              nname : nname,
              upwd : upwd
          })   
          let me = this;
          this.axios({
              method: 'post',
              url:'http://localhost:3306/visitor/login',
              data:postData
          }).then((res)=>{
              //console.log(res.data.code)
              if(res.data.code == 200){
                alert('登录成功')
                this.encryption(upwd)
                this.setCookie('nname',nname,3)
                this.setCookie('epwd',me.epwd,3)
                this.skip()
              }
              
          })
      }
    },
    //注册
    regBtn:function(){
      this.animateWidth('uname')
      this.animateWidth('nname')
      this.animateWidth('upwd')
      let uname = this.uname;
      let nname = this.nname;
      let upwd = this.upwd;
      if(uname != '' && nname != '' && upwd != ''){
          let postData = this.qs.stringify({
              uname : uname,
              nname : nname,
              upwd : upwd
          })   
          let me = this
          this.axios({
              method: 'post',
              url:'http://localhost:3306/visitor/register',
              data:postData
          }).then((res)=>{
              if(res.data.code == 200){
                alert('注册成功')
                this.encryption(upwd)
                this.setCookie('nname',nname,3)
                this.setCookie('epwd',me.epwd,3)
                this.skip()
              }
          })
      }
    }
  },
  
  mounted() {
    //页面初始化方法
    this.preload()
    
  }
};
</script>

<style scoped>
.banner{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2e70a2 url('https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner7.jpg') no-repeat center;
  background-size: cover;
  z-index: 10;
}
.log-content{
  position: fixed;
  top: 50%;
  left: 50%;
  background: rgba(250, 250, 250, .6);
  width: 500px;
  margin: -200px 0 0 -250px;
  z-index: 10;
  border-radius: 10px;
  padding: 20px;
}
.log-input,.log-btn{
  width: 300px;
  margin: 20px auto;
  position: relative;
}
.log-input p{
  font-size: 1.2rem;
  color: #44abfc;
  font-weight: bold;
  margin: 30px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
} 
.log-input p span:first-child{
  display: block;
  width: 30%;
  text-align: right;
}
.log-input p input{
  width: 70%;
  font-size: 1rem;
  line-height: 35px;
  padding: 0 35px;
  border-radius: 35px 0 35px 0;
  outline: none;
  color: #333;
  border: 2px solid #2ac1fc;
  -webkit-box-shadow: rgba(42,193,252,0) -2px 2px 2px;
  -moz-box-shadow: rgba(42,193,252,0) -2px 2px 2px;
  box-shadow: rgba(42,193,252,0) -2px 2px 2px;
  transition: all .5s;
  background: rgba(0, 0, 0, 0);
}
.log-input p input:focus{
  -webkit-box-shadow: rgba(42,193,252,0.5) -2px 2px 2px;
  -moz-box-shadow: rgba(42,193,252,0.5) -2px 2px 2px;
  box-shadow: rgba(42,193,252,0.5) -2px 2px 2px;
}
.eye{
  cursor: pointer;
  width: 25px;
  height: 25px;
  position: absolute;
  top: 7px;
  right: 15px;
}

.warn{
  position: absolute;
  right: 0;
  bottom: -20px;
  font-size: 12px;
  color: #f00;
}

.log-btn{
  margin-top: 30px;
}
.login{
  display: block;
  width: 150px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  background: linear-gradient(to right,#50a2fd,#21c8fb,#00e2fa);
  color: transparent;
  -webkit-box-shadow: rgba(73,167,253,.5) 0 3px 3px;
  -moz-box-shadow: rgba(73,167,253,.5) 0 3px 3px;
  box-shadow: rgba(73,167,253,.5) 0 3px 3px;
  color: #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all .5s;
}
.login:hover{
  background: linear-gradient(to right,#4e26f3,#5b70ce,#50a2fd);
  color: #fff;
}
.select{
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 16px;
  color: #5b70ce;
  cursor: pointer;
  font-style:italic;
  transition: all .5s;
  font-weight: bold;
}
.select:hover{
  color: blue;
}

.hint{
  font-size: .8rem;
  color: #666;
  font-style:italic;
  margin-top: 30px;
  line-height: 1.5;
  text-align: center;

}
.index{
  width: 40px;
  height: 40px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
  border-radius: 50%;
  overflow: hidden;
}
.index img{
  display: block;
  width: 100%;
}
@media (max-width: 750px) {
  .log-content{
    top: 25%;
    left: 5%;
    width: 90%;
    margin:  0 0 0 0;
  }
}
@media (max-width: 370px) {
  .log-content{
    top: 25%;
    left: 1%;
    width: 98%;
    margin:  0 0 0 0;
    padding: 5px;
  }
}
</style>
