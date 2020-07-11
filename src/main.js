// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//jquery
import $ from 'jquery'

//swiper
import 'swiper/css/swiper.css';

//引入视频插件
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

//axios的使用
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.axios = axios;
Vue.use(VueAxios, axios);

//解决axios post请求问题
import qs from 'qs';
Vue.prototype.qs = qs;

//cookie
import VueCookies from 'vue-cookies'
Vue.prototype.$cookie = VueCookies;
Vue.use(VueCookies)

//处理mysql返回的时间
//npm i moment -S
import moment from 'moment'
Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD HH:mm") {
    return moment(dateStr).format(pattern);
});
Vue.filter('dateFormats', function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dateStr).format(pattern);
});
//使用{{ 时间 |  dateFormat}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})