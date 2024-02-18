import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router';
import ListLocations from './components/ListLocations.vue';
import NewLocation from './views/NewLocation.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: ListLocations },
      { path: '/new', component: NewLocation },
    ],
  });

createApp(App).use(router).mount('#app')
