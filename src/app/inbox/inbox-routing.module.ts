import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  /**
   * This is strongly correlated with the lazy loading of the InboxModule. Whenever the user goes to the '/inbox/' path
   * this will load the HomeComponent of the InboxModule
   *
   */
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
