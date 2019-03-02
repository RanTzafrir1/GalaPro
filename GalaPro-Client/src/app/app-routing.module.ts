import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/users' },
  // { path: 'users', loadChildren: './users/users.module#UsersModule' },
  // { path: '**', pathMatch: 'full', redirectTo: '/users' } // catch any unfound routes and redirect to home page
    {path: 'usersmodule', loadChildren: './users/users.module#UsersModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
