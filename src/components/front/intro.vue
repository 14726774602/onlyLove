<template>
    <div>
        <!-- 弹框组件 -->
        <con_alert :deta="alert_con"></con_alert>
        <m_loading v-if="hideLoading"></m_loading>
        <div class="intro-container">
            <div class="intro-content" v-if="showIntro">
                <router-link class="return-index" to="/index">
                    <svg t="1591782151857" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1209" width="200" height="200"><path d="M632.117978 513.833356l361.805812 361.735298a85.462608 85.462608 0 1 1-121.001515 120.789974L511.116463 634.552816 146.913186 998.756094a86.026718 86.026718 0 0 1-121.706652-121.706652L389.480325 512.775651 27.674513 150.969839A85.392095 85.392095 0 0 1 148.393973 30.250379L510.199785 392.056191l366.671258-366.671258a86.026718 86.026718 0 0 1 121.706652 121.706652z" p-id="1210" fill="#333333"></path></svg>
                </router-link>
                <div class="intro-photo-uname">
                    <p class="photo" :style="{backgroundImage: 'url(' + personIntro.img_url + ')'}"></p>
                    <p class="uname">
                        {{personIntro.uname}}
                    </p>
                </div>
                <div class="intro-intro">
                    <p>账号：<span>{{personIntro.nname}}</span></p>
                    <p>注册时间：<span>{{personIntro.data_time | dateFormat}}</span></p>
                </div>
                <div class="intro-up">
                    <span v-if="false" @click="showIntro=false;showPwd=false;showUpIntro=true;">修改个人信息</span>
                    <span @click="showIntro=false;showPwd=true;showUpIntro=false;">修改密码</span>
                </div>
            </div>
            <!-- 修改密码 -->
            <div v-if="showPwd" class="up-upwd">
                <div>
                    <p>
                        原密码：<input @blur="animateWidth('oldpwd')" id="oldpwd" :type="oldpwdType" placeholder="请输入密码"><br>
                        <svg v-if="!showoldPwd" @click="showoldUpwd(),showoldPwd = true" data-v-ef68022e="" t="1590740051933" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3010" width="200" height="200" class="icon eye"><path data-v-ef68022e="" d="M954.432 354.624a34.688 34.688 0 0 0-6.4-44.992c-14.4-11.264-33.664-8.064-44.864 6.4-1.6 1.6-179.456 212.224-390.976 212.224-205.12 0-390.976-212.224-392.576-213.824a32.448 32.448 0 0 0-44.864-3.2 32.704 32.704 0 0 0-3.2 44.992c3.136 4.864 41.6 48.256 102.528 96.448L92.352 537.92a31.168 31.168 0 0 0 1.6 44.992c3.2 6.4 11.2 9.664 19.2 9.664a31.36 31.36 0 0 0 22.4-9.664l88.128-91.648a623.168 623.168 0 0 0 145.792 75.52l-33.6 114.176a32.128 32.128 0 0 0 22.464 40.192h9.6a30.976 30.976 0 0 0 30.464-24.128l33.6-114.112c25.664 4.8 52.864 8.064 80.128 8.064 27.264 0 54.464-3.2 80.128-8.064l33.664 112.512c3.2 14.464 17.6 24.128 30.464 24.128 3.2 0 6.4 0 8-1.6a32.192 32.192 0 0 0 22.464-40.192l-33.664-112.512a620.864 620.864 0 0 0 145.792-75.584l86.528 90.048c6.4 6.4 14.4 9.664 22.464 9.664a31.36 31.36 0 0 0 22.4-9.664 32.64 32.64 0 0 0 1.6-44.992l-81.728-85.184c65.728-48.256 104.192-94.912 104.192-94.912z" p-id="3011" fill="#2ac1fc"></path></svg>
                        <svg v-if="showoldPwd" @click="showoldUpwd(),showoldPwd = false" data-v-ef68022e="" t="1590740104107" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4447" width="200" height="200" class="icon eye"><path data-v-ef68022e="" d="M518.826667 763.733333c-98.190222 0-177.777778-79.587556-177.777778-177.777777s79.587556-177.777778 177.777778-177.777778 177.777778 79.587556 177.777777 177.777778-79.587556 177.777778-177.777777 177.777777z m0-99.555555a78.222222 78.222222 0 1 0 0-156.444445 78.222222 78.222222 0 0 0 0 156.444445z" p-id="4448" fill="#2ac1fc"></path><path data-v-ef68022e="" d="M522.467556 814.520889c124.529778 0 249.287111-73.244444 374.357333-224.199111-109.155556-151.054222-233.244444-224.241778-374.357333-224.241778-141.255111 0-269.909333 73.329778-387.569778 224.284444 133.575111 150.798222 262.869333 224.156444 387.569778 224.156445z m373.063111-380.344889c36.750222 37.432889 71.68 81.038222 104.803555 130.744889l19.911111 29.880889-22.087111 28.330666C848.284444 815.317333 689.706667 914.062222 522.467556 914.062222c-166.684444 0-329.742222-98.176-489.571556-289.664L8.149333 594.773333l22.570667-31.331555c44.743111-62.122667 91.818667-114.673778 141.169778-157.482667l-84.337778-89.827555a35.555556 35.555556 0 1 1 51.84-48.668445l88.789333 94.577778c51.342222-35.726222 104.96-61.525333 160.768-77.226667l-43.079111-101.674666a35.555556 35.555556 0 1 1 65.479111-27.733334l48.739556 115.000889a499.527111 499.527111 0 0 1 62.378667-3.868444c36.508444 0 72.007111 3.882667 106.481777 11.619555l56.945778-125.297778a35.555556 35.555556 0 0 1 64.739556 29.44l-53.105778 116.821334c51.043556 19.911111 99.612444 48.938667 145.621333 86.897778l103.936-103.950223a35.555556 35.555556 0 0 1 50.289778 50.289778l-101.831111 101.831111z" p-id="4449" fill="#2ac1fc"></path></svg>
                        <span data-v-ef68022e="" class="warn">{{warn_oldpwd}}</span>
                    </p>
                    <p>
                        新密码：<input @blur="animateWidth('newpwd')" id="newpwd" :type="newpwdType" placeholder="请输入密码">
                        <svg v-if="!shownewPwd" @click="shownewUpwd(),shownewPwd = true" data-v-ef68022e="" t="1590740051933" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3010" width="200" height="200" class="icon eye"><path data-v-ef68022e="" d="M954.432 354.624a34.688 34.688 0 0 0-6.4-44.992c-14.4-11.264-33.664-8.064-44.864 6.4-1.6 1.6-179.456 212.224-390.976 212.224-205.12 0-390.976-212.224-392.576-213.824a32.448 32.448 0 0 0-44.864-3.2 32.704 32.704 0 0 0-3.2 44.992c3.136 4.864 41.6 48.256 102.528 96.448L92.352 537.92a31.168 31.168 0 0 0 1.6 44.992c3.2 6.4 11.2 9.664 19.2 9.664a31.36 31.36 0 0 0 22.4-9.664l88.128-91.648a623.168 623.168 0 0 0 145.792 75.52l-33.6 114.176a32.128 32.128 0 0 0 22.464 40.192h9.6a30.976 30.976 0 0 0 30.464-24.128l33.6-114.112c25.664 4.8 52.864 8.064 80.128 8.064 27.264 0 54.464-3.2 80.128-8.064l33.664 112.512c3.2 14.464 17.6 24.128 30.464 24.128 3.2 0 6.4 0 8-1.6a32.192 32.192 0 0 0 22.464-40.192l-33.664-112.512a620.864 620.864 0 0 0 145.792-75.584l86.528 90.048c6.4 6.4 14.4 9.664 22.464 9.664a31.36 31.36 0 0 0 22.4-9.664 32.64 32.64 0 0 0 1.6-44.992l-81.728-85.184c65.728-48.256 104.192-94.912 104.192-94.912z" p-id="3011" fill="#2ac1fc"></path></svg>
                        <svg v-if="shownewPwd" @click="shownewUpwd(),shownewPwd = false" data-v-ef68022e="" t="1590740104107" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4447" width="200" height="200" class="icon eye"><path data-v-ef68022e="" d="M518.826667 763.733333c-98.190222 0-177.777778-79.587556-177.777778-177.777777s79.587556-177.777778 177.777778-177.777778 177.777778 79.587556 177.777777 177.777778-79.587556 177.777778-177.777777 177.777777z m0-99.555555a78.222222 78.222222 0 1 0 0-156.444445 78.222222 78.222222 0 0 0 0 156.444445z" p-id="4448" fill="#2ac1fc"></path><path data-v-ef68022e="" d="M522.467556 814.520889c124.529778 0 249.287111-73.244444 374.357333-224.199111-109.155556-151.054222-233.244444-224.241778-374.357333-224.241778-141.255111 0-269.909333 73.329778-387.569778 224.284444 133.575111 150.798222 262.869333 224.156444 387.569778 224.156445z m373.063111-380.344889c36.750222 37.432889 71.68 81.038222 104.803555 130.744889l19.911111 29.880889-22.087111 28.330666C848.284444 815.317333 689.706667 914.062222 522.467556 914.062222c-166.684444 0-329.742222-98.176-489.571556-289.664L8.149333 594.773333l22.570667-31.331555c44.743111-62.122667 91.818667-114.673778 141.169778-157.482667l-84.337778-89.827555a35.555556 35.555556 0 1 1 51.84-48.668445l88.789333 94.577778c51.342222-35.726222 104.96-61.525333 160.768-77.226667l-43.079111-101.674666a35.555556 35.555556 0 1 1 65.479111-27.733334l48.739556 115.000889a499.527111 499.527111 0 0 1 62.378667-3.868444c36.508444 0 72.007111 3.882667 106.481777 11.619555l56.945778-125.297778a35.555556 35.555556 0 0 1 64.739556 29.44l-53.105778 116.821334c51.043556 19.911111 99.612444 48.938667 145.621333 86.897778l103.936-103.950223a35.555556 35.555556 0 0 1 50.289778 50.289778l-101.831111 101.831111z" p-id="4449" fill="#2ac1fc"></path></svg>
                        <span data-v-ef68022e="" class="warn">{{warn_newpwd}}</span>
                    </p>
                    <p class="p-btn">
                        <span @click="upUpwd()" class="up-btn">确认</span>
                        <span @click="showIntro=true;showPwd=false;" class="up-btn">取消</span>
                    </p>
                </div>
            </div>
            <!-- 修改个人信息 -->
            <div v-if="showUpIntro" class="up-intro">
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
import con_alert from "@/components/basis/alert"
import m_loading from "@/components/basis/loading"
export default {
   components: {
       m_loading,
       con_alert
  },
  data() {
    return {
      name : '个人信息',
      hideLoading:true,
      personIntro:{},
      alert_con:{
        show:false,
        text:''
      },
      showIntro:true,   //显示隐藏信息框
      showPwd:false,    //显示隐藏密码框
      showUpIntro:false,    //显示隐藏修改信息框
      warn_oldpwd:'',    //旧密码提示框
      warn_newpwd:'',    //新密码提示框
      oldPwd:'',   //旧密码
      oldpwdType:'password',
      showoldPwd:false,
      newPwd:'', //新密码
      newpwdType:'password',
      shownewPwd:false,
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
    this.getIntro()
  },
  methods: {
    //设置cookie 的值
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    //图片预加载的方法
    preload: function() {
        let image = new Image()
        image.src = 'https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner9.jpg'
        image.onload = () => {
            this.hideLoading = false
        }
    },
    //获取用户全部信息
    getIntro:function(){
        let nname = this.$cookie.get('nname');
        let epwd = this.$cookie.get('epwd');
        let arr = epwd.split(',')
        for(let i = 0;i<arr.length;i++){
          arr[i] = arr[i].slice(16)
          arr[i] = String.fromCharCode(arr[i])
        }
        let upwd = arr.join('')
        let postData = this.qs.stringify({
            nname : nname,
            upwd : upwd
        }) 
        let that = this;
        this.axios({
            method: 'post',
            url:'http://api.hjwxl.com:3000/visitor/gain',
            data:postData
        }).then((res)=>{
          if(res.data.length > 0){
           that.personIntro = res.data[0]
           that.preload()
          }
        })
    },
    //修改密码
    upUpwd:function(){
        let oldPwd = this.oldPwd
        let newPwd = this.newPwd
        let nname = this.$cookie.get('nname');
        if(oldPwd == ''){
            this.warn_oldpwd = "*密码不能为空"
        }else if(newPwd == ''){
            this.warn_newpwd = "*密码不能为空"
        }else if(oldPwd == newPwd){
            this.warn_newpwd = "*跟原始密码一致"
        }else if(oldPwd != this.personIntro.upwd){
            this.warn_oldpwd = "*原始密码错误"
        }else {
            let postData = this.qs.stringify({
                nname : nname,
                upwd : newPwd
            })
            let that = this;
            this.axios({
                method: 'post',
                url:'http://api.hjwxl.com:3000/visitor/uppwd',
                data:postData
            }).then((res)=>{
                if(res.data.code == 200){
                    that.alert_con.show = true;
                    that.alert_con.text = '密码修改成功';
                    that.showIntro=true;
                    that.showPwd=false;
                }
            })
        }
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
      }else if(name == 'oldpwd'){
        if($('#'+name).val() == ''){
          this.warn_oldpwd = "*密码不能为空"
          this.oldPwd = ''
        }else{
          let reg = /^(\w){6,16}$/
          if(reg.test($('#'+name).val())){
            this.warn_oldpwd = ""
            this.oldPwd = $('#'+name).val()
          }else{
            this.warn_oldpwd = "*密码只能为6-16位字母、数字或下划线"
            this.oldPwd = ''
          }
        }
      }else if(name == 'newpwd'){
        if($('#'+name).val() == ''){
          this.warn_newpwd = "*密码不能为空"
          this.newPwd = ''
        }else{
          let reg = /^(\w){6,16}$/
          if(reg.test($('#'+name).val())){
            this.warn_newpwd = ""
            this.newPwd = $('#'+name).val()
          }else{
            this.warn_newpwd = "*密码只能为6-16位字母、数字或下划线"
            this.newPwd = ''
          }
        }
      }
    },
    //显示隐藏密码
    showoldUpwd:function(){
        this.oldpwdType = this.oldpwdType === 'password' ? 'text' : 'password';
    },
    shownewUpwd:function(){
        this.newpwdType = this.newpwdType === 'password' ? 'text' : 'password';
    },

  }
};
</script>

<style scoped>
.intro-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('https://only-love.oss-cn-beijing.aliyuncs.com/banner/banner9.jpg') no-repeat center;
    background-size: cover;
}
.intro-content,.up-upwd{
    padding: 30px 20px;
    background: rgba(250, 250, 250, .8);
    border-radius: 5px;
    max-width: 600px;
    width: 90%;
    position: relative;
}
.return-index{
    position: absolute;
    top: 5px;
    right: 5px;
}
.return-index svg{
    width: 20px;
    height: 20px;
}
.intro-photo-uname{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
}
.intro-photo-uname .photo{
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
}
.intro-photo-uname .uname{
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.5;
    color: #666;
    letter-spacing: 1px;
}
.intro-intro{
    margin-top: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
}
.intro-intro p{
    margin-top: 10px;
    font-size: 1rem;
    line-height: 2;
    color: #999;
}
.intro-intro p span{
    color: #333;
}
.intro-up{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.intro-up span{
    display: inline-block;
    padding: 0 30px;
    height: 40px;
    line-height: 40px;
    font-size: .9rem;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    background: linear-gradient(to right,#50a2fd,#21c8fb,#00e2fa);
    color: transparent;
    -webkit-box-shadow: rgba(73,167,253,.5) 0 3px 3px;
    -moz-box-shadow: rgba(73,167,253,.5) 0 3px 3px;
    box-shadow: rgba(73,167,253,.5) 0 3px 3px;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
    transition: all .5s;
}
.intro-up span:hover{
    background: linear-gradient(to right,#4e26f3,#5b70ce,#50a2fd);
}

/* 修改密码 */
.up-upwd{
    display: flex;
    justify-content: center;
    align-items: center;
}
.up-upwd div p{
    text-align: right;
    font-size: 1rem;
    color: #44abfc;
    font-weight: bold;
    margin: 0 0 30px;
    position: relative;
}
.up-upwd div p input{
    width: 70%;
    font-size: 1rem;
    line-height: 35px;
    padding: 0 35px;
    border-radius: 35px 0 35px 0;
    outline: none;
    color: #333;
    border: 2px solid #2ac1fc;
    transition: all .5s;
    background: rgba(0, 0, 0, 0);
    margin-left: 5px;
}

.up-upwd div p input:focus{
    box-shadow: rgba(42,193,252,0.5) -2px 2px 2px;
}
.up-upwd div p svg{
    cursor: pointer;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 7px;
    right: 15px;
}
.up-upwd div p .warn{
    position: absolute;
    right: 0;
    bottom: -20px;
    font-size: 12px;
    color: #f00;
}
.up-upwd div .p-btn{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 40px;
}
.up-btn{
    display: inline-block;
    padding: 0 30px;
    height: 35px;
    line-height: 35px;
    font-size: 1rem;
    font-weight: bold;
    margin: 0 auto;
    text-align: center;
    background: -webkit-gradient(linear,left top, right top,from(#50a2fd),color-stop(#21c8fb),to(#00e2fa));
    background: linear-gradient(to right,#50a2fd,#21c8fb,#00e2fa);
    color: transparent;
    -webkit-box-shadow: rgba(73,167,253,.5) 0 3px 3px;
    box-shadow: rgba(73,167,253,.5) 0 3px 3px;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
    -webkit-transition: all .5s;
    transition: all .5s;
}
.up-btn:hover{
    background: linear-gradient(to right,#4e26f3,#5b70ce,#50a2fd);
}
@media (max-width:750px){
    .intro-content,.up-upwd{
        padding: 20px 10px;
    }
}
</style>
