import VueRouter from 'vue-router';
import Home from '../pages/home/index.vue';
import Dingtalk from '../pages/dingtalk/index.vue';
import houseList from '../pages/home/houseList.vue';
import houseDetail from '../pages/home/houseDetail.vue';
import doorList from '../pages/home/doorList.vue';
import doorDetail from '../pages/home/doorDetail.vue';
import contractForm from '../pages/home/contractForm.vue';
import checkList from '../pages/home/checkList.vue';
import photo from '../pages/home/photo.vue';
import check from '../pages/home/check.vue';
import yuding from '../pages/home/yuding.vue';
import taskList from '../pages/home/taskList.vue';
import taskDetail from '../pages/home/taskDetail.vue';

const routes = [
  {
    path:'/',
    name: 'check',
    component: check
  },
  {
    path:'/home',
    name: 'home',
    component: Home
  },
  {
    path: '/dingtalk',
    name: 'dingtalk',
    component: Dingtalk
  },
  {
    path: '/houseList',
    name: 'houseList',
    component: houseList
  },
  {
    path: '/houseDetail',
    name: 'houseDetail',
    component: houseDetail
  },
  {
    path: '/doorList',
    name: 'doorList',
    component: doorList
  },
  {
    path: '/contractForm',
    name: 'contractForm',
    component: contractForm
  },
  {
    path: '/checkList',
    name: 'checkList',
    component: checkList
  },
  {
    path: '/photo',
    name: 'photo',
    component: photo
  },
  {
    path: '/doorDetail',
    name: 'doorDetail',
    component: doorDetail
  },
  {
    path: '/yuding',
    name: 'yuding',
    component: yuding
  },
  {
    path: '/taskList',
    name: 'taskList',
    component: taskList
  },
  {
    path: '/taskDetail',
    name: 'taskDetail',
    component: taskDetail
  }
];

export default function Router(Vue){
  Vue.use(VueRouter);
  const router = new VueRouter({
    routes: routes
  });
  return {
    router
  }
}
