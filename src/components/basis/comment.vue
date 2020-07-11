<template>
  <div>
    <con_alert :deta="alert_con"></con_alert>
    <!-- 发送评论 -->
    <div class="send-com">
      <textarea name="" id="com-input" maxlength="200" @focus="ifLogin()"></textarea>
      <p><span @click="insertComment()">发布评论</span></p>
    </div>
    <div class="comment-content">
        <div class="comment-item" v-for="(key,i) in comment_con" :key="i">
            <!-- 评论 -->
            <div class="com-container">
                <p class="com-uname">{{key.uname}}：</p>
                <p class="com-text">{{key.content}}</p>
                <p class="com-replay">
                    <span class="com-time">{{key.data_time | dateFormats}}</span>
                    <span @click="btnReplay(key.id,key.uname)" class="btn-replay">回复</span>
                </p>
            </div>  
            <!-- 回复 -->
            <div class="reply-container">
                <div :class="'com-'+key.id" v-for="(list,n) in replay_con[key.id]" :list="n">
                    <p class="replay-uname"><span>{{list.master_name}}</span> @<span>{{list.comment_name}}</span></p>
                    <p class="replay-text">{{list.content}}</p>
                    <p class="com-replay">
                        <span class="com-time">{{list.data_time | dateFormats}}</span>
                        <span @click="btnReplay(key.id,list.master_name)" class="btn-replay">回复</span>
                    </p>
                </div>
            </div>
            <!-- 更多收起 -->
            <div v-if="replay_con[key.id] && replay_con[key.id].length > 1" class="hideShow">
                <span :class="'btn-'+key.id" @click="showReplay(key.id)">更多</span>
            </div>
        </div>
    </div>
    <div v-if="hideReplay" class="replay-input">
      <div>
        <svg @click="hideReplay=false" t="1591256235582" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8630" width="200" height="200"><path d="M767.98 815.98c-12.31 0-24.56-4.69-33.94-14.06l-512-512c-18.75-18.75-18.75-49.12 0-67.88s49.13-18.75 67.88 0l512 512c18.75 18.75 18.75 49.12 0 67.88-9.38 9.38-21.63 14.06-33.94 14.06z" fill="#ffffff" p-id="8631"></path><path d="M255.98 815.98c-12.31 0-24.56-4.69-33.94-14.06-18.75-18.75-18.75-49.12 0-67.88l512-512c18.75-18.75 49.12-18.75 67.88 0s18.75 49.12 0 67.88l-512 512c-9.38 9.38-21.63 14.06-33.94 14.06z" fill="#ffffff" p-id="8632"></path></svg>
        <textarea name="" id="rep-input" maxlength="200" @focus="ifLogin()"></textarea>
        <p><span @click="sendReplay()">回 复</span></p>
      </div>
    </div>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
import con_alert from "@/components/basis/alert"
export default {
  components: {
    con_alert
  },
  data() {
    return {
      name : '评论',
      comment_con:[],
      replay_con:{},
      hidReplay:true,
      alert_con:{
        show:false,
        text:''
      },
      hideReplay:false,
      replay_send:{
        comment_id:'',
        master_name:'',
        comment_name:''
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
  created() {
    //实例创建完成后调用,此阶段完成了数据的观测,可调用data数据
  },
  mounted() {
    //页面初始化方法
    this.getComment()
    setInterval(() => {
      this.getComment()
    }, 1000*60*5);
  },
  methods: {
    //定义方法的地方
    //判断cookie
    ifLogin:function(){
      let uname = this.$cookie.get('uname')
      if(!uname){
        this.alert_con.show = true;
        this.alert_con.text = '您还没有登录注册哦！请前往登录注册页面进行登录或注册~~~';
        $('#com-input').blur()
      }
    },
    //
    //发送评论
    insertComment:function(){
      let uname = this.$cookie.get('uname')
      if(!uname){
        this.alert_con.show = true;
        this.alert_con.text = '您还没有登录注册哦！请前往登录注册页面进行登录或注册~~~';
      }else{
        let content = $('#com-input').val()
        if(content == ''){
          this.alert_con.show = true;
          this.alert_con.text = '您还没有输入任何内容哦！请输入评论内容再进行发布~~~';
        }else{
          let class_name = ''
          if(this.$route.path == '/life_page' | this.$route.path.split('/')[1] == 'it_page'){
              class_name = 'article'
          }else if(this.$route.path == '/photo_page'){
            class_name = 'photo'
          }
          let article_id = this.$route.query.id;
          let postData = this.qs.stringify({
              uname : uname,
              class_name : class_name,
              article_id : article_id,
              content : content
          })   
          let that = this
          //console.log(uname+','+class_name+','+article_id+','+content)
          this.axios({
              method: 'post',
              url:'http://localhost:3306/review/upcomment',
              data:postData
          }).then((res)=>{
              if(res.data.code == 200){
                that.getComment()
                $('#com-input').val('')
              }
              that.alert_con.show = true;
              that.alert_con.text = res.data.msg;
          })
        }
      }
    },
    //回复按钮
    btnReplay:function(cid,cname){
      let uname = this.$cookie.get('uname')
      if(!uname){
        this.alert_con.show = true;
        this.alert_con.text = '您还没有登录注册哦！请前往登录注册页面进行登录或注册~~~';
      }else{
        this.hideReplay = true
        this.replay_send.comment_id = cid;
        this.replay_send.master_name = uname;
        this.replay_send.comment_name = cname;
      }
    },
    //发送回复
    sendReplay:function(){
      let content = $('#rep-input').val()
      if(content == ''){
        this.alert_con.show = true;
        this.alert_con.text = '您还没有输入任何内容哦！请输入评论内容再进行发布~~~';
      }else{
        let comment_id = this.replay_send.comment_id
        let master_name = this.replay_send.master_name
        let comment_name = this.replay_send.comment_name
        let postData = this.qs.stringify({
            comment_id : comment_id,
            master_name : master_name,
            comment_name : comment_name,
            content : content
        })  
        let that = this
        this.axios({
            method: 'post',
            url:'http://localhost:3306/review/upreply',
            data:postData
        }).then((res)=>{
            if(res.data.code == 200){
              that.getReplay(comment_id)
              that.hideReplay = false
              $('#rep-input').val('')
            }
            that.alert_con.show = true;
            that.alert_con.text = res.data.msg;
        })
      }
    },
    //获取文章评论
    getComment:function(){
        let article_id = this.$route.query.id
        let class_name = ''
        if(this.$route.path == '/life_page' | this.$route.path.split('/')[1] == 'it_page'){
            class_name = 'article'
        }else if(this.$route.path == '/photo_page'){
            class_name = 'photo'
        }
        let url = 'http://localhost:3306/review/comment'
        let that = this
        this.axios.get(url, {
          params: {
            article_id : article_id,
            class_name : class_name
          }
        })
        .then(function (result) {
            if(result.data.length > 0){
                that.comment_con = result.data
                for(let i = 0;i < that.comment_con.length; i++){
                    that.getReplay(that.comment_con[i].id)
                }
            }else{
                that.comment_con = []
            }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //获取评论回复
    getReplay:function(a){
        let comment_id = a 
        let url = 'http://localhost:3306/review/reply'
        let that = this
        this.axios.get(url, {
          params: {
            comment_id : comment_id
          }
        })
        .then(function (result) {
            if(result.data.length > 0){
                that.$set(that.replay_con, a, result.data)
            }else{
                that.replay_con[a] = ''
            }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //展开收起评论回复
    showReplay:function(aid){
      //当前为隐藏  true
      if(this.hidReplay){
        //显示全部
        $('.reply-container .com-'+aid).css('display','block')
        $('.btn-'+aid).html('收起')
      }else{
        //隐藏
        $('.reply-container .com-'+aid).css('display','none')
        $('.btn-'+aid).html('更多')
      }
      this.hidReplay = !this.hidReplay
    }
  },

};
</script>

<style scoped>
    .comment-item{
        padding: 10px 10px;
        border: 1px solid #6caee6;
        border-radius: 5px;
        margin-bottom: 10px;
    }   
    .comment-item:last-child{
        margin-bottom: 0;
    }
    .reply-container{
        padding: 0 15px;
    }
    .com-container,
    .reply-container div{
        border-bottom: 1px solid #cccc;
    }
    .reply-container div{
       display: none;
    }
    .com-uname,.replay-uname{
        color: #00f;
        font-size: .9rem;
        letter-spacing: 1px;
        line-height: 2;
    }
    .com-text,.replay-text{
        font-size: .8rem;
        line-height: 1.5;
        color: #333;
    }
    .com-replay{
        color: #aaa;
        font-size: .8rem;
        line-height: 30px;
        height: 30px;
    }
    .com-time{
        float: left;
    }
    .btn-replay{
        float: right;
        cursor: pointer;
    }
    .btn-replay:hover{
        color: #666;
    }
    .reply-container div:first-child{
      display: block !important;
    }
    .hideShow{
      font-size: .8rem;
      padding: 10px 15px 0;
      text-align: right;
      color: #9393e6;
      
    }
    .hideShow span{
      cursor: pointer;
    }
    /* 评论框 */
    .send-com{
      width: 100%;
      margin-bottom: 10px;
    }
    .send-com textarea{
      width: 100%;
      height: 80px;
      padding: 10px;
      border: 1px solid #6caee6;
      border-radius: 5px;
      text-decoration: none;
      outline: none;
      font-size: .8rem;
      line-height: 1.5;
    }
    .send-com p{
      text-align: right;
    }
    .send-com p span{
      display: inline-block;
      font-size: .9rem;
      color: #6caee6;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-right: 20px;
      background: rgba(250, 250, 250, .8);
      transition: all .5s;
    }
    .send-com p span:hover{
      color: #00f;
      background: rgba(255, 255, 255, .8)    
    } 
    .replay-input{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .replay-input div{
      max-width: 500px;
      width: 90%;
      padding: 45px 20px 20px;
      background: rgba(21, 17, 17, .8);
      border-radius: 5px;
      position: relative;
    }
    .replay-input div svg{
      width: 30px;
      height: 30px;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
    .replay-input div textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #f00;
      color: #333;
    }
    .replay-input div p{
      padding: 0 10px;
      text-align: right;
      margin-top: 15px;
    }
    
    .replay-input div p span{
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-size: .9rem;
      height: 30px;
      padding: 0 30px;
      border-radius: 30px;
      line-height: 30px;
      margin: 0 20px;
      background: -webkit-gradient(linear,left top, right top,from(#50a2fd),color-stop(#21c8fb),to(#00e2fa));
      background: linear-gradient(to right,#50a2fd,#21c8fb,#00e2fa);
    }
    .replay-input div p span:hover{
      background: -webkit-gradient(linear,left top, right top,from(#4e26f3),color-stop(#5b70ce),to(#50a2fd));
      background: linear-gradient(to right,#4e26f3,#5b70ce,#50a2fd);
    }
</style>
