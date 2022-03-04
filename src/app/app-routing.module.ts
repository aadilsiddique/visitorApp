import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'visitor-list',
    loadChildren: () => import('./pages/visitor-list/visitor-list.module').then( m => m.VisitorListPageModule)
  },
  {
    path: 'visitor-add-edit',
    loadChildren: () => import('./pages/visitor-add-edit/visitor-add-edit.module').then( m => m.VisitorAddEditPageModule)
  },
  {
    path: 'lattest-news',
    loadChildren: () => import('./pages/lattest-news/lattest-news.module').then( m => m.LattestNewsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
