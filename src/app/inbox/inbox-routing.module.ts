import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PlaceholderComponent} from './placeholder/placeholder.component';
import {EmailShowComponent} from './email-show/email-show.component';


const routes: Routes = [
  /**
   * This is strongly correlated with the lazy loading of the InboxModule. Whenever the user goes to the '/inbox/' path
   * this will load the HomeComponent of the InboxModule
   *
   */
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: ':id', component: EmailShowComponent },
      { path: '', component: PlaceholderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
