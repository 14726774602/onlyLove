<template>
  <div class="my-container animated fadeInDown">
      <div class="my-title">竹轩的小站</div>
      <div class="my-text">
        还不知道放啥  先空着吧
      </div>
      <div class="leave-word">
        <p>留言板：</p>
        <leave_word></leave_word>
      </div>
  </div>
</template>

<script>
// 父组通过  :deta="data中的数据"  的方式将数据传递给子组件
import leave_word from "@/components/basis/leave_word"
export default {
   components: {
     leave_word
  },
  data() {
    return {
      time : '关于我',
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
    //监听方法click事件等，执行drawFeatures方法
  },
  
  mounted() {
    //页面初始化方法
  }
};
</script>

<style scoped>
.my-container{
  background: rgba(250, 250, 250, .5);
  padding: 20px;
  border-radius: 5px;
}
.my-title{
  color: #333;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 2;
}
.my-text{
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  text-indent: 2rem;
}
.leave-word{
  margin: 20px 20px 0;
}
.leave-word p{
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #666;
  font-weight: bold;
}
@media (max-width: 750px) {
  .leave-word{
    margin: 20px 0 0;
  }
}
</style>
