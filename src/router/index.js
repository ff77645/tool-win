import {createRouter,createWebHistory} from 'vue-router'
import Main from '@/views/Main/index.vue'
const routes = [
    {
        path:'/',
        component:Main,
    },
    {
        path:'/image',
        children:[
            {
                path:'compress',
                component:()=>import('@/views/Image/Compress/index.vue')
            }
        ]
    },
    {
        path:'/video',
        children:[
            {
                path:'manage',
                component:()=>import('@/views/Video/Manage/index.vue')
            }
        ]
    }
]


const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router