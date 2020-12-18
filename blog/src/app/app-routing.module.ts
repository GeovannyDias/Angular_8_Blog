import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { DetailsPostComponent } from './components/posts/details-post/details-post.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: ContainerAppComponent,
    children: [
      { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
      { path: 'details-post/:id', component: DetailsPostComponent }, // se renderice este componente
      { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
      
    ]
  },

  // { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
  // { path: 'post/:id', component: PostComponent },
  // { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
  // { path: 'profile', loadChildren: () => import('./components/admin/profile/profile.module').then(m => m.ProfileModule) }
  // { path: 'posts', loadChildren: () => import('./components/posts/list-posts/list-posts.module').then(m => m.ListPostsModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
