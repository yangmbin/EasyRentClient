/*
 * 1. 先导入vue，再导入vue-router，然后调用Vue.use(VueRouter)来启用Vue-router插件
 * 2. vue的路由设置是统一写在router-config这个文件里的，
 * 3. 将路由传给VueRouter的实例
 * 4. 该实例里混入根组件，然后传递给Vue的实例
 * 5. Vue实例挂载到页面之中
 * */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routeConfig from './route-config'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 引用API文件
import api from './api/api.js'
// 将API方法绑定到全局
Vue.prototype.$api = api


Vue.use(VueRouter);
Vue.use(iView);

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes: routeConfig
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue(Vue.util.extend({router}, App)).$mount('#app')