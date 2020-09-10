<template>
  <div>
    <m_loading v-if="hideLoading"></m_loading>
    <div class="swiper-photo animated fadeInDown">
      <!-- <swiper_video  :deta="videos"></swiper_video> -->
      <div class="photo-title">最新相册</div>
      <swiper_photo v-if="isRouterAlive" :deta="phptoCon"></swiper_photo>
    </div>
    <div id="sub-content" class="sub-content">
      <div class="sub-text">
        <div class="sub-title">最新发布文章</div>
        <ul class="a-content" :style="{minHeight: max_height+ 'px'}">
          <li ref="item" class="item" v-for="(key,i) in article" :key="i" :style="{left:item_coor[i].left + 'px',top:item_coor[i].top + 'px'}">
            <div>
              <router-link :to="key.bg_class == 1 ? '/life_page?id='+key.id : '/it_page/it'+key.id+'?sm_class='+key.sm_class+'&id='+key.id">
                <p class="a-img"><img :src="key.title_url" alt=""></p>
                <p class="a-title">{{key.title}}</p>
                <p class="a-time">{{key.issueTime  | dateFormat}}</p>
                <p class="a-text">{{key.intro}}</p>
                <p class="a-gauze"></p>
              </router-link> 
            </div>
          </li>
        </ul>
        <div class="paging">
          <p class="prev" @click="paging(at_num-=1)">上一页</p>
          <p class="present">第{{at_num}}页</p>
          <p class="next" @click="paging(at_num+=1)">下一页</p>
          <p class="sum">共计{{sum_num}}页</p>
        </div>
      </div>
      <div class="person">
        <div class="sub-title">个人</div>
        <right_nav></right_nav>
      </div>
    </div>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
// import swiper_video from "@/components/basis/swiper_video"
import swiper_photo from "@/components/basis/swiper_photo"
import right_nav from "@/components/basis/right_nav"
import m_loading from "@/components/basis/loading"
//使用swiper
export default {
   components: {
    //  swiper_video,
     swiper_photo,
     right_nav,
     m_loading,

  },
  data() {
    return {
      hideLoading:true,
      at_num:1,
      sum_num:1,
      time : '首页',
      videos:[
        {id:1,img_url:'/static/img/swiper/swp1.png',video_url:'/static/img/swiper/swp1.mp4',title:'聆听你，感悟你，写意你',time:'2019-10-31'},
        {id:2,img_url:'/static/img/swiper/swp1.png',video_url:'/static/img/swiper/swp1.mp4',title:'聆听你，感悟你，写意你',time:'2019-10-31'},
        {id:3,img_url:'/static/img/swiper/swp1.png',video_url:'/static/img/swiper/swp1.mp4',title:'聆听你，感悟你，写意你',time:'2019-10-31'},
        {id:4,img_url:'/static/img/swiper/swp1.png',video_url:'/static/img/swiper/swp1.mp4',title:'聆听你，感悟你，写意你',time:'2019-10-31'},
        {id:5,img_url:'/static/img/swiper/swp1.png',video_url:'/static/img/swiper/swp1.mp4',title:'聆听你，感悟你，写意你',time:'2019-10-31'}
      ],
      phptoCon:'',
      //接受文章数据
      article:[],
      col:2,  //列数
      col_height:[], //保存每列高度的数组
      col_width:'', //保存item宽度
      item_height:[],//保存每个item的高度 
      item_coor:[],  //保存每个item坐标
      item_btm:10,  //设置下边距
      max_height:'', //最高高度
      screenWidth: document.body.clientWidth, //当前屏幕尺寸
      count: 0,
      isRouterAlive:false
     
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
    //执行请求
    //this.getArticle();
    this.getPage();
    this.getPhoto()
  },
  mounted() {
    //页面初始化方法
    const that = this;
    //窗口发生改变时执行的函数
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
        that.quireCoord();
    })()}
  },
  methods: {
    //定义方法的地方
    //监听方法click事件等，执行drawFeatures方法
    //获取相册前10
    getPhoto:function(){
      //总页数查询
      let that = this;
      this.axios({
        method: 'get',
        url:'http://api.hjwxl.com:3000/photo/listSw',
        data:''
      }).then((res)=>{
        console.log(res)
        that.phptoCon = res.data 
        that.reload ()
      })
      .catch(function (error) {
          console.log(error);
        });
    },
    //图片预加载的方法
    preload: function() {
      //初始化坐标
      this.item_coor = []
      for (let i = 0;i < this.article.length;i++){
        this.item_coor.push({left:'0',top:'0'}) 
      } 
      //初始化图片预加载
      this.count = 0;
      for (let img of this.article) {
        let image = new Image()
        image.src = img.title_url
        image.onload = () => {
          this.count++
        }
      }
    },
    //页数查询
    getPage:function(){
      //总页数查询
      this.axios({
        method: 'get',
        url:'http://api.hjwxl.com:3000/article/list_pno',
        data:''
      }).then((res)=>{
        if(res.data.length>0){
          this.sum_num = Math.ceil(res.data[0]['COUNT(*)']/10)
          this.paging();
        }
      })
    },
    //分页
    paging:function(a){
      //回到顶部
      document.body.scrollIntoView();
      this.hideLoading = true;
      //开始分页
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
    //获取文章数据
    getArticle:function(){
      let url = 'http://api.hjwxl.com:3000/article/list'
      //获取当前页数
      let pno = this.at_num
      let that = this
      this.axios.get(url, {
          params: {
            pno: pno
          }
        })
        .then(function (result) {
          console.log(result)
          if(result.data.length>0){
            that.article = result.data
            that.preload()
          } else{
            alert('获取数据失败')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //开始瀑布流
    quireCoord:function(){
      this.addWindow();
      this.col_width = $(".item").width();//获取item宽度
      let arr = [];
      let str = []
      $(".item").each(function(){
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
      for(let a = 0; a<this.article.length; a++){
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
      if(this.screenWidth < 750){
          this.col = 1;
      }else{
        this.col = 2;
      }
    },
    //参数发生改变时重新执行加载组件的函数
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  },
  watch: {
    //监听预加载
    count: function(val) {
      if(val  == this.article.length && val != 0){
        let that = this
        let timeId = setTimeout(function(){
          that.hideLoading = false;
        },300)
        this.quireCoord();
      }
    }
  }
};
</script>

<style scoped>
  .swiper-photo{
    padding: 10px;
    background: rgba(250, 250, 250, .5);
  }
  .photo-title{
    font-size: 1.2rem;
    line-height: 3;
    font-weight: bold;
    color: #000;
    letter-spacing: 1px;
  }
  .sub-content{
    margin-top: 10px;
    padding: 0 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background: rgba(238, 238, 238, .5);
  }

  .sub-title{
    font-size: 1.2rem;
    line-height: 3;
    font-weight: bold;
    color: #000;
    letter-spacing: 1px;
  }
  .sub-text{
    width: 68%;
  }
  .person{
    width: 30%;
  }

  .a-content{
    margin-top: -.5rem;
    width: 100%;
    position: relative;
  }

  .item{
      z-index: 10;
      transition: 0.8s;
      width: 50%;
      position: absolute;
  }
  .item div{
    width: 100%;
    box-sizing: border-box;
    padding: .5rem ;
  }
 
  .item div a{
    display: block;
    background: #fafafa;
    padding: .5rem;
    border-radius: 3px;
    position: relative;
  }
  .a-img{
    overflow: hidden;
  }
  .a-img img{
    width: 100%;
    display: block;
    transition: all .5s;
  }
  
  .a-title{
    font-size: 1rem;
    line-height: 2;
    color: #333;    
    font-weight: bold;
    letter-spacing: 1px;
    transition: all .3s;
  }
  .a-time{
    font-size: .8rem;
    line-height: 1.5;
    color: #f00;    
    padding: 0 1rem;
    letter-spacing: 1px;
  }
  .a-text{
    padding: 0 1rem;
    color: #666;
    line-height: 1.5;
    font-size: .8rem;
    letter-spacing: 1px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: all .3s;
  }
  .a-gauze{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-box-shadow: rgba(0,0,0,0.5) 0px .3rem .3rem;
    -moz-box-shadow: rgb(0,0,0,0.5) 0px .3rem .3rem;
    box-shadow: rgba(0,0,0,0.5) 0px .3rem .3rem;
    opacity: 0;
    transition: all .5s;
    z-index: -1;
  }
  .item div:hover a .a-gauze{
    opacity: 1;
  }
  .item div:hover a .a-title{
    color: #f00;
  }
  .item div:hover a .a-text{
    color: #000;
  }
  .item div:hover a .a-img img{
    transform: scale(1.1);
  } 

  /* 分页 */
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
    .person{
      display: none;
    }
    .sub-text{
      width: 100%;
    }
  }
  @media (max-width: 750px) {
  .sub-content{
    padding: 10px 0;
  }
  .swiper-video{
    padding: 10px 10px;
    background: #fafafa;
    animation: bounceInDown .5s;
  }
  .item{
    width: 100%;
  }
  }
</style>
