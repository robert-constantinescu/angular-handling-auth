import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {
    /**
     * The below is for lazy loading of the InboxModule, whenever user goes to the `/inbox` path
     * load the InboxModule. It makes no sense to always load this module
     *
     */
    path: 'inbox',
    canLoad: [AuthGuard],
    loadChildren: () => import('./inbox/inbox.module').then(mod => mod.InboxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
* {
    "username": "robertangularauth"
}
* */
