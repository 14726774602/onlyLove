<template>
  <div>
    <div class="page-container">
        <m_loading v-if="hideLoading"></m_loading>
        <div class="page-header animated fadeInDown">
            <p class="page-title">💕{{photoItem.title}}💕</p>
            <p class="page-time">{{photoItem.issueTime | dateFormat}}</p>
            <p class="page-intro">{{photoItem.intro}}</p>
        </div>
        <div class="life-content" :style="{minHeight: max_height+ 'px'}">
        <div class="life-item" v-for="(key,i) in imgArr" :key="i" :style="{left:item_coor[i].left + 'px',top:item_coor[i].top + 'px'}">
            <div>
            <a href="javascript:;">
                <p class="item-img"><img :src="key" alt=""></p>
            </a>
            </div>
        </div>
        </div>
        <div class="page-like">
            <span @click="getLike()">❤（{{photoItem.alike}}）</span>
        </div>
    </div>
    <div class="page-comment">
      <comment v-if="isRouterAlive"></comment>
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
      name : '相册页面',
      hideLoading:true,//显示加载中
      photoItem:'',//图片内容
      imgArr:[],
      col:2,  //列数
      col_height:[], //保存每列高度的数组
      col_width:'', //保存item宽度
      item_height:[],//保存每个item的高度 
      item_coor:[],  //保存每个item坐标
      item_btm:10,  //设置下边距
      max_height:'', //最高高度
      screenWidth: document.body.clientWidth, //当前屏幕尺寸
      count: 0,
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
    this.getPhotoItem()
    const that = this;
    //窗口发生改变时执行的函数
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
        this.quireCoord();
      })()
    }
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
            let nlike = 'photo_page' + this.$route.query.id
            let ifLike = this.$cookie.get(nlike)
            let id = this.$route.query.id;
            let url = 'http://api.hjwxl.com:3000/photo/getLike'
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
                that.photoItem.alike = result.data[0].alike
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
            let alike = this.photoItem.alike;
            let postData = this.qs.stringify({
              id : id,
              alike : alike
            })   
            let that = this;
            this.axios({
                method: 'post',
                url:'http://api.hjwxl.com:3000/photo/addLike',
                data:postData
            }).then((res)=>{
                if(res.data.code == 200){
                    console.log(res.data.msg)
                }
                
            })
        },
        //获取当前相册数据
        getPhotoItem:function(){
            let id = this.$route.query.id;
            let url = 'http://api.hjwxl.com:3000/photo/item'
            let that = this
            this.axios.get(url, {
            params: {
                id : id
            }
            })
            .then(function (result) {
            if(result.data.length > 0){
                that.photoItem = result.data[0]
                that.imgArr = that.photoItem.photo.split(',')
                that.item_coor = [];
                for (let i = 0;i < that.imgArr.length;i++){
                    that.item_coor.push({left:'0',top:'0'}) 
                }
                that.preload()
            }else{
                alert('获取数据失败')
            }
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        //图片预加载
        preload: function() {
            for (let img of this.imgArr) {
                let image = new Image()
                image.src = img
                image.onload = () => {
                this.count++
                }
            }
        },
        quireCoord:function(){
            this.addWindow();
            this.col_width = $(".life-item").width();//获取item宽度
            let arr = [];
            let str = []
            $(".life-item").each(function(){
                arr.push(Math.ceil($(this).height()));
                str.push({left:'0',top:'0'})  //初始化item坐标
            });
            this.item_height = [].concat(arr);//获取每个item的高度
            for(let i = 0;i<this.col;i++){
                this.col_height[i] = 0; //初始化每列的高度
            }
            this.addCoord()
        },
        addCoord:function(){
            for(let a = 0; a<this.imgArr.length; a++){
                var min = Math.min.apply(Math,this.col_height); //获取列中最小高度
                var sub = this.col_height.indexOf(min)  //获取列下标
                this.item_coor[a].left = this.col_width*sub  //将当前item对应的left坐标保存到数组中
                this.item_coor[a].top = this.col_height[sub];  //将当前item对应的top坐标保存到数组中
                this.col_height[sub] += this.item_height[a];   //改变当前列的高度  加上当前item的高度
                this.col_height[sub] += this.item_btm; //改变当前列的高度  加上下边距
                var max = Math.max.apply(Math,this.col_height); 
                this.max_height = max;
            }
        },
        //获取页面窗口大小
        addWindow:function(){
            if(this.screenWidth > 1000){
                this.col = 3;
            }else if(this.screenWidth > 750){
                this.col = 2;
            }else{
                this.col = 1;
            }
        },
        reload () {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        }
    },
    watch: {
        count: function(val) {
            if(this.imgArr != '' && val  == this.imgArr.length && val != 0){
                let that = this
                let timeId = setTimeout(function(){
                    that.hideLoading = false;
                },300)
                that.quireCoord();
            }
        }
    }
};
</script>

<style scoped>
.page-container{
    padding: 20px;
    border-radius: 5px;
    background: rgba(238, 238, 238, .5);
}
.life-content{
    position: relative;
}
.life-item{
  width: 33.333%;
  transition: all .8s;
  position: absolute;
}
.life-item div{
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}
.life-item a{
    display: block;
    background: #fafafa;
    padding: .5rem;
    border-radius: 3px;
    position: relative;
    -webkit-box-shadow: rgba(0,0,0,0) 0px .3rem .3rem;
    -moz-box-shadow: rgb(0,0,0,0) 0px .3rem .3rem;
    box-shadow: rgba(0,0,0,0) 0px .3rem .3rem;
    transition: all .5s;
    overflow: hidden;
}
.item-img{
  overflow: hidden;
}
.item-img img{
  width: 100%;
  display: block;
  transition: all .5s;
}
.life-item div:hover a{
  -webkit-box-shadow: rgba(0,0,0,0.5) 0px .3rem .3rem;
  -moz-box-shadow: rgb(0,0,0,0.5) 0px .3rem .3rem;
  box-shadow: rgba(0,0,0,0.5) 0px .3rem .3rem;
}
.life-item div:hover a .item-img img{
  transform: scale(1.1);
} 
.page-header{
    padding: 10px;
    margin-bottom: 10px;
    background: rgba(250, 250, 250, .8);
    border-radius: 5px;
}
.page-header .page-title{
    font-size: 1.6rem;
    font-weight: bold;
    color: #2c154c;
    text-align: left;
    letter-spacing: 2px;
    line-height: 2;
}
.page-header .page-intro{
    font-size: .9rem;
    line-height: 1.5;
    text-indent: 1.8rem;
    color: #333;
}
.page-time{
    text-indent: 1.8rem;
    font-size: .9rem;
    color: #f00;
    margin-bottom: 10px;
}
.page-like{
    text-align: right;
}
.page-like span{
    cursor: pointer;
    transition: all .3s;
}
.page-like span:hover{
    color: #f00;   
}
.page-comment{
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    margin: 10px auto;
    background: rgba(250, 250, 250, .5);
}
@media (max-width: 1000px) {
  .life-item{
    width: 50%;
  }
}
@media (max-width: 750px) {
  .page-container{
    padding: 10px;
  }
  .page-comment{
      padding: 10px;
  }
  .life-content{
    margin-top: 10px;
  }
  .life-item{
    width: 100%;
  }
  .page-header .page-title{
    font-size: 1.2rem;
  }
}
</style>
