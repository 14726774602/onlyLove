<template>
  <div v-if="deta.show" class="alert-container">
    <div class="alert-content">
        <p class="alert-text">{{deta.text}}</p>
        <p class="alert-btn">
            <span @click="hidAlert()">确定</span>
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
      name : '弹框'
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
  },
  methods: {
    //定义方法的地方
    hidAlert:function(){
        this.deta.show = false 
    }
  }
};
</script>

<style scoped>
.alert-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
.alert-content{
    max-width: 400px;
    width: 90%;
    padding: 20px;
    background: rgba(21, 17, 17, .8);
    border-radius: 10px;
    text-align: center;
}
.alert-text{
    font-size: 1rem;
    line-height: 1.5;
    color: #fff;
    margin-bottom: 20px;
    
}
.alert-btn span{
    color: #fff;
    cursor: pointer;
    display: inline-block;
    height: 30px;
    padding: 0 30px;
    border-radius: 30px;
    line-height: 30px;
    margin: 0 20px;
    background: linear-gradient(to right,#50a2fd,#21c8fb,#00e2fa);
}
.alert-btn span:hover{
    background: linear-gradient(to right,#4e26f3,#5b70ce,#50a2fd);
}
</style>
