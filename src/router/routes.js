
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        name: 'home',
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
        path: '/read/:id/:cap',
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
