<template>
  <div class="it-content">
    <div class="item" v-for="(key,i) in deta" :key="i">
        <p class="item-title">{{key.title}}</p>
        <p class="item-time">{{key.issueTime | dateFormat}}</p>
        <p class="item-intro">{{key.intro}}</p>
        <p class="item-look"><router-link :to="'/it_page/it'+key.id+'?sm_class='+key.sm_class+'&id='+key.id">查看详情</router-link></p>
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
      name : 'it文章预览页'
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
  methods: {
    //定义方法的地方
  },
  mounted() {
    //页面初始化方法
  }
};
</script>

<style scoped>
.it-content{
  width: 100%;
}
.it-content .item{
  width: 100%;
  padding: 1rem;
  border-radius: 3px;
  background: #fafafa;
  margin-bottom: 20px;
  transition: all .5s;
  -webkit-box-shadow: rgba(0,0,0,0) 0px .3rem .3rem;
  -moz-box-shadow: rgb(0,0,0,0) 0px .3rem .3rem;
  box-shadow: rgba(0,0,0,0) 0px .3rem .3rem;
}
.it-content .item:hover{
  -webkit-box-shadow: rgba(0,0,0,0.5) 0px .3rem .3rem;
  -moz-box-shadow: rgb(0,0,0,0.5) 0px .3rem .3rem;
  box-shadow: rgba(0,0,0,0.5) 0px .3rem .3rem;
}
.it-content .item-title{
  font-size: 1rem;
  color: #000;
  line-height: 2;
  font-weight: bold;
  transition: all .5s;
}
.it-content .item-time{
  font-size: .8rem;
  color: #f00;
  line-height: 1.5;
}
.it-content .item-intro{
  margin-top: 5px;
  font-size: .8rem;
  color: #333;
  line-height: 1.5;
  text-indent: 1.6rem;
}
.it-content .item .item-look{
  display: block;
  width: 100%;
  text-align: right;
  
}
.it-content .item .item-look a{
  font-size: .9rem;
  color: #fff;
  display: inline-block;
  padding: 8px 15px; 
  background: #a8aef1;
  border-radius: 5px;
  transition: all .5s;
  margin-top: 5px;
}
.it-content .item:hover .item-title{
  color: #f00;
}
.it-content .item .item-look a:hover{
  background: blue;
}
@media (max-width:750px){
  .it-content .item{
    padding: .5rem;
    margin-bottom: 10px;
  }
}
</style>
