<template>
  <div>
    <m_loading v-if="hideLoading"></m_loading>
    <div class="life-container">
      <div class="life-content" :style="{minHeight: max_height+ 'px'}">
        <div class="life-item" v-for="(key,i) in deta" :key="i" :style="{left:item_coor[i].left + 'px',top:item_coor[i].top + 'px'}">
          <div>
            <router-link :to="key.bg_class == 1 ? '/life_page?id='+key.id : '/it_page?id='+key.id">
              <p class="item-img"><img :src="key.title_url" alt=""></p>
              <p class="item-title">{{key.title}}</p>
              <p class="item-time">{{key.issueTime  | dateFormat}}</p>
              <p class="item-text">{{key.intro}}</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="right-nav">
        <right_nav></right_nav>
      </div>
    </div>
  </div>
</template>

<script>
import right_nav from "@/components/basis/right_nav"
import m_loading from "@/components/basis/loading"
export default {
   components: {
    right_nav,
    m_loading
  },
  data() {
    return {
      hideLoading:true,//显示加载中
      article:this.deta,
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
  created() {
    //实例创建完成后调用,此阶段完成了数据的观测,可调用data数据
    //添加每个数组默认的坐标
    this.item_coor = [];
    for (let i = 0;i < this.article.length;i++){
     this.item_coor.push({left:'0',top:'0'}) 
    }
    
  },
  mounted() {
    this.preload();
    const that = this
    //可视窗口发生变化时执行的函数
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
    //监听方法click事件等，执行drawFeatures方法
    //图片预加载的方法
    preload: function() {
      for (let img of this.article) {
        let image = new Image()
        image.src = img.title_url
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
    }
  },
  watch: {
    count: function(val) {
      if((val  == this.article.length && val != 0) | this.article.length == 0){
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

.life-container{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px;
}
.life-content{
  width: 68%;
  margin-top: -.5rem;
  position: relative;
}

.life-item{
  width: 50%;
  transition: all .8s;
  position: absolute;
}
.life-item div{
  padding: .5rem;
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
}

.item-img{
  overflow: hidden;
}
.item-img img{
  width: 100%;
  display: block;
  transition: all .5s;
}

.item-title{
  font-size: 1rem;
  line-height: 2;
  color: #333;    
  font-weight: bold;
  letter-spacing: 1px;
  transition: all .3s;
}

.item-time{
  padding: 0 1rem;
  font-size: .8rem;
  line-height: 1.5;
  color: #f00;    
  letter-spacing: 1px;
  transition: all .5s;
}
.item-text{
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
  transition: all .5s;
}


.life-item div:hover a{
  -webkit-box-shadow: rgba(0,0,0,0.5) 0px .3rem .3rem;
  -moz-box-shadow: rgb(0,0,0,0.5) 0px .3rem .3rem;
  box-shadow: rgba(0,0,0,0.5) 0px .3rem .3rem;
}
.life-item div:hover a .item-gauze{
  opacity: 1;
}
.life-item div:hover a .item-title{
  color: #f00;
}
.life-item div:hover a .item-text{
  color: #000;
}
.life-item div:hover a .item-img img{
  transform: scale(1.1);
} 


.right-nav{
  width: 30%;
}
@media (max-width: 1200px) {
  .right-nav{
    display: none;
  }
  .life-content{
    width: 100%;
  }
}
@media (max-width: 750px) {
  .life-item{
    width: 100%;
  }
}
</style>
