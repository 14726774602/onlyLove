<template>
  <div class="item-container">
        <p>css渐变的背景</p>
<textarea class="code" autoHeight="true" readonly="readonly">
<!-- html代码 -->
<div class="bg">渐变背景</span></div>

<!-- css代码 -->
<style>
  .bg{
    background: -webkit-linear-gradient(to left,red,yellow,blue); /* Safari 5.1-6.0 */
    background: -o-linear-gradient(to left,red,yellow,blue); /* Opera 11.1-12.0 */ 
    background: -moz-linear-gradient(to left,red,yellow,blue); /* Firefox 3.6-15 */
    background: linear-gradient(to left,red,yellow,blue); /* 标准语法 */
  }
</style>
</textarea>
    <p>
      1、background: linear-gradient(to left,#d3959b,#bfe6ba);<br>
      to left 设置渐变从右到左，相当于270deg
    </p>
    <p>
      2、background: linear-gradient(to right,#d3959b,#bfe6ba);<br>
      to right设置渐变从左到右，相当于90deg
    </p>
    <p>
      3、background: linear-gradient(to top,#d3959b,#bfe6ba);<br>
      to top 设置渐变从下到上，相当于0deg
    </p>
    <p>
      4、background: linear-gradient(to bottom,#d3959b,#bfe6ba);
      to bottom 设置渐变从上到下，相当于180deg
    </p>
    <p>
      5、background: linear-gradient(to top right,#d3959b,#bfe6ba);
      to right top = to top right ：从左下角到右上角，对角线角度
    </p>
    <p>
      6、background: linear-gradient(45deg,#d3959b,#bfe6ba);
      和to top right 有细微差别（背景为正方形的时候无差别）
    </p>
    <p>
      7、background: linear-gradient(45deg,#d3959b 20%,#bfe6ba);
      用百分比指定起始颜色的位置，默认值为0%；
    </p>
    <p>
      可以根据具体的效果去设置渐变方向和渐变的颜色以及颜色的渐变占比等等
    </p>
    <p>还可以用渐变设置渐变的文字，与背景同理</p>
<textarea class="code" autoHeight="true" readonly="readonly">
<!-- html代码 -->
<div><span class="shade">渐变的文字</span></div>

<!-- css代码 -->
<style>
  .shade{
    background: linear-gradient(to right,#f4324e,#ffc107, blue,#dc175a,red);
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
</textarea>
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
      name : 'css渐变，如何设置背景渐变和文字渐变'
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
.item-container>p{
  margin-bottom: 10px;
  font-size: .9rem;
  color: #333;
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
</style>
