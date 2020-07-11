<template>
  <div class="item-container">
    <p>CSS3旋转rotate()方法</p>
    <p>一般旋转</p>
<textarea class="code" autoHeight="true" readonly="readonly">
<!-- html -->
<div class="content">旋转</div>

<!-- css -->
<style>
  .content{
    width:100px;
    height:100px;
    line-height:100px;
    color:#fff;
    background-color: #000;
    text-align:center;
    transform:rotate(45deg);  /*顺时针旋转45度，旋转中心默认为重心*/
    -webkit-transform:rotate(45deg);  /*兼容-webkit-引擎浏览器*/
    -moz-transform:rotate(45deg);     /*兼容-moz-引擎浏览器*/
  }
  
</style>
</textarea>
  <p>效果展示</p>
  <p class="square">旋转45度</p>
  <p>实现3D立方体旋转</p>
<textarea class="code" autoHeight="true" readonly="readonly">
<!-- html -->
<div class="content-3d">
  <div class="front">1</div>
      <div class="back">2</div>
      <div class="left">3</div>
      <div class="right">4</div>
      <div class="top">5</div>
      <div class="bottom">6</div>
</div>

<!-- css -->
<style>
  .content-3d{
    width: 100px;
    height: 100px;
    border: 1px dashed #ffffff;
    margin: 30px 50px;
    position: relative;
    transform-style: preserve-3d ;
    animation: run 3s linear infinite;
  }
  @keyframes run{
    from{
        transform: rotateY(0deg);
    }
    to{
        transform: rotateY(360deg);
    }
  }
  .content-3d div{
      width: 100px;
      height: 100px;
      background: rgba(255,255,255,0.3) ;
      border-radius: 10px;
      position: absolute;
      color: #000;
      font-weight: bolder;
      text-align: center ;
      line-height: 100px;
  }
  .front{
      transform: translateZ(50px);
  }
  .back{
      transform: translateZ(-50px);
  }
  .left{
      transform:rotateX(90deg) translateZ(-50px);
  }
  /*位置一定都是基于Z轴调*/
  .right{
      transform:rotateX(90deg) translateZ(50px);
  }
  .top{
      transform:rotateY(90deg) translateZ(50px);
  }
  .bottom{
      transform:rotateY(90deg) translateZ(-50px);
  }
</style>
</textarea>
  <p>效果展示</p>
  <div class="content-3d">
    <div class="front">1</div>
        <div class="back">2</div>
        <div class="left">3</div>
        <div class="right">4</div>
        <div class="top">5</div>
        <div class="bottom">6</div>
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
      name : 'rotate旋转'
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
    this.autoTextarea()
  },
  mounted() {
    //页面初始化方法

  },
  methods: {
    //定义方法的地方
    //textarea高度自动
    autoTextarea:function(){
      $(function() {
        $.fn.autoHeight = function() {
          function autoHeight(elem) {
            elem.style.height = 'auto';
            elem.scrollTop = 0; //防抖动
            elem.style.height = elem.scrollHeight + 'px';
          }
          this.each(function() {
            autoHeight(this);
            $(this).on('keyup', function() {
                autoHeight(this);
            });
          });
        }
        $('textarea[autoHeight]').autoHeight();
      })
    }
  }
};
</script>

<style scoped>
.item-container{
  border: 1px solid #ccc;
  padding: 10px 10px 0;
  border-radius: 5px;
}
.item-container p{
  margin-bottom: 10px;
}
.code{
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
  line-height: 1.2;
  border: 1px solid #aaa;
  margin-bottom: 10px;
  color: #FF9DA4;
  background: #002451;
}
.square{
  margin: 25px 0 25px 30px !important;
  width:100px;
  height:100px;
  line-height:100px;
  color:#fff;
  background-color: #000;
  text-align:center;
  transform:rotate(45deg);  /*顺时针旋转45度，旋转中心默认为重心*/
  -webkit-transform:rotate(45deg);  /*兼容-webkit-引擎浏览器*/
  -moz-transform:rotate(45deg);     /*兼容-moz-引擎浏览器*/
}
.content-3d{
  width: 100px;
  height: 100px;
  border: 1px dashed #ffffff;
  margin: 30px 50px;
  position: relative;
  transform-style: preserve-3d ;
  animation: run 3s linear infinite;
}
@keyframes run{
  from{
      transform: rotateY(0deg);
  }
  to{
      transform: rotateY(360deg);
  }
}
.content-3d div{
    width: 100px;
    height: 100px;
    background: rgba(255,255,255,0.3) ;
    border-radius: 10px;
    position: absolute;
    color: #000;
    font-weight: bolder;
    text-align: center ;
    line-height: 100px;
}
.front{
    transform: translateZ(50px);
}
.back{
    transform: translateZ(-50px);
}
.left{
    transform:rotateX(90deg) translateZ(-50px);
}
/*位置一定都是基于Z轴调*/
.right{
    transform:rotateX(90deg) translateZ(50px);
}
.top{
    transform:rotateY(90deg) translateZ(50px);
}
.bottom{
    transform:rotateY(90deg) translateZ(-50px);
}
</style>
