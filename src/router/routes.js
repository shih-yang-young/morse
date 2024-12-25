const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SingleFile.vue') },
      { path: '/SingleFile', component: () => import('src/pages/SingleFile.vue') },
      { path: '/MultiFile', component: () => import('src/pages/MultiFile.vue') },
      { path: '/DirectoryFile', component: () => import('src/pages/DirectoryFile.vue') },
      { path: '/ExhaustiveAttack', component: () => import('src/pages/ExhaustiveAttack.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
