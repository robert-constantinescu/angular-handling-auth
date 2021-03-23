import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Email} from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  email: Email;
  constructor(private activeRoute: ActivatedRoute) {

    /**
     *  - In the constructor is the soonest that we can access the DATA that the RESOLVER will send to the current component
     *  - using the 'snapshot.data' might do the work and retrieve the data the RESOLVER is sending, but the downside is that:
     *        - if the component is already loaded, and then the Resolver will send some other `data`, we will now know about it
     *        - this happens because the SNAPSHOT represents the ActivatedRoute object AT A SPECIFIC POINT IN TIME(the time when it was called)
     *        - if our route(url path) only change in value and not in STRUCTURE(e.g: we update the id), then the component
     *        will not be recreated and the SNAPSHOT DATA will not be updated
     * console.log();
     */


    /**
     * The benefit of the below approach is that the RESOLVER will be called(executed) EVERY TIME the route(url path) is changing
     *
     * this.activeRoute.data.subscribe((data) => console.log(data));
     */

    /**
     *     the below is 100% executed before the component it's actually rendered
     *     so there is no point in time that the component will de displayed when email is undefined
     *
     *     However as a fallback, we can use both approaches, and also add this:
     *           this.email = this.activeRoute.snapshot.data.email;
     */
    this.activeRoute.data.subscribe(({email}) => {
      this.email = email;
    });

  }

  ngOnInit(): void {
    /**
     * There are several issues with the below implementation: Lesson 331
     *     this.activeRoute.params.subscribe(( {id} ) => {
     *          this.emailService.getEmail(id).subscribe(email => {
     *              console.log(email);
     *          });
     *      });
     *
     *
     *  1. If a user switch fast between emails and one of the request takes a little bit longer, we might get out of sync responses
     *      e.g: we select en email, the angular make a request that takes a little bit longer, but meanwhile we change the selected email
     *        while angular has not finished the initial request. So first we will receive the response for the first selected email,
     *        than for the second one. Even though we changed the selected email
     *
     *  2. The first request is not cancelled when we make the 2nd one
     *     so we consume unnecessary resources that could slow the application
     */

    /**
     * switchMap will just cancel the previous request(if it was not completed) as soon as it receives another value(we select another email)
     * from the 'params' BehaviorSubject  - Lesson 332
     *
     * this.activeRoute.params
     *   .pipe(
     *     switchMap(({id}) => {
     *       return this.emailService.getEmail(id);
     *     })
     *   ).subscribe((email) => {this.email = email});
     */

  }

}
