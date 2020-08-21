import Vue from 'vue';
import Router from 'vue-router';
import Jsas from './views/jsas.vue';
import New from './views/new.vue';
import Show from './views/show.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/jsas'
    },
    {
      path: '/jsas',
      name: 'jsas',
      component: Jsas
    },
    {
      path: '/jsas/new',
      name: 'new-jsa',
      component: New
    },
    {
      path: '/jsas/:id',
      name: 'show',
      component: Show
    }
   
  ]
});