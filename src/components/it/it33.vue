<template>
  <div class="item-container">
    <p class="font">{{name}}</p>
<textarea class="code" autoHeight="true" readonly="readonly">
你好吗
你好吗
你好吗
你好吗
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
      name : '技术文章模板'
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
.font{
  margin-bottom: 10px;
  font-size: .9rem;
  color: #666;
}
.code{
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
  line-height: 1.2;
  border: 1px solid #aaa;
  margin-bottom: 10px;
}
</style>
