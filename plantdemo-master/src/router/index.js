import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/Home'
import boardbash from '@/components/boardbash'
import plantdetail from '@/components/plantdetail'
import cameraview from '@/components/cameraview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:"/boardbash"
    },
    {
      path: '/home',
      name: 'home',
      component:home,
      children:[
        {
          path:'/boardbash',
          name:'boardbash',
          component:boardbash,
          meta:true
        },
        {
          path:'/plantdetail',
          name:'plantdetail',
          component:plantdetail,
        },
        {
          path:'/cameraview',
          name:'cameraview',
          component:cameraview
        }
      ]
    }
  ]
})
