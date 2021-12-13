require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from "./routes/routes";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})
window.Toast = Toast;



Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
})

Vue.component('public-master', require('./components/master.vue').default);


const app = new Vue({
    el: '#app',
    router,
});
