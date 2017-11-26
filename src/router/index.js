import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Ranking from '@/components/Ranking';
import HeaderElement from '@/components/HeaderElement';
import RankingList from '@/components/RankingList';
import RankingUsersList from '@/components/RankingUsersList';
import AlbumsChosen from '@/components/AlbumsChosen';

Vue.use(Router)

Vue.component('headerElement', HeaderElement);
Vue.component('RankingList', RankingList);
Vue.component('RankingUsersList', RankingUsersList);
Vue.component('AlbumsChosen', AlbumsChosen);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/ranking/:uuid',
      name: 'ranking',
      component: Ranking,
      props: true
    }
  ]
});
