import {createRouter,createWebHistory} from 'vue-router'
import Home from '@/views/home.vue'

const routes = [
    {
        path:'/',
        component:Home
    },
    {
        path:'/random-number',
        component:()=>import('@/views/random-number.vue')
    },
    {
        path:'/img-compress',
        component:()=>import('@/views/img-compress/index.vue')
    }
]


const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router