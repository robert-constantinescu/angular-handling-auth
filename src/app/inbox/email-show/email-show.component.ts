import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmailService} from '../email.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private emailService: EmailService) { }

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
     */
    this.activeRoute.params
      .pipe(
        switchMap(({id}) => {
          return this.emailService.getEmail(id);
        })
      ).subscribe((email) => {console.log(email)});

  }

}
