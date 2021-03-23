import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PlaceholderComponent} from './placeholder/placeholder.component';
import {EmailShowComponent} from './email-show/email-show.component';
import {EmailResolverService} from './email-resolver.service';


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
      {
        path: ':id',
        component: EmailShowComponent,
        resolve:
        /**
         * It is entirely possible that the component might have many different resolvers for the data from it requiring multiple pieces of information
         * To solve that, we can provide our Resolver inside an Object
         *
         * What is this really saying here is that:
         *  1. in the EmailShowComponent there is a piece of data called 'email'
         *  2. The source of that data('email) is going to be the EmailResolverService
         *  3. Angular is going to run the 'resolve' method from EmailResolverService BEFORE it loads the component
         *     and is going to make sure that we got some data from that thing and assign it to the 'email' property.
         *  4. And it's going to take the entire Object and pass it to the component
         *
         */
          {
            email: EmailResolverService
          }
      },
      { path: '', component: PlaceholderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
