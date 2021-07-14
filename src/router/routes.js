
const routes = [
  {
    path: '/',
    name: 'mainLayout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '/main', 
        name: 'main',
        components: {
          main: () => import('pages/home.vue'),  
        }
      },         
      {
        path: '/info/:id',
        name: 'info',
        components: {
          main: () => import('pages/info.vue'),      
        },           
      },
      {
        path: '/read/:id',
        name: 'read',
        components: {
          main: () => import('pages/read.vue'),                
        },
        props: true,        
      },
    ]
  },
         

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
