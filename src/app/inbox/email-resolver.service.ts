import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Email} from './email';
import {EMPTY, Observable} from 'rxjs';
import {EmailService} from './email.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService  implements Resolve<Email>{

  constructor(private emailService: EmailService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Email> | Promise<Email> | Email {
    // i hope that i will remember that is just some syntactic sugar to get directly the id parameter of the object returned by route.params
    const { id } = route.params;


    /**
     * we can return immediately an EMAIL, or we can return an OBSERVABLE that will eventually emit an EMAIL or a PROMISE
     *
     * my getEmail() method returns an OBSERVABLE that eventually emits an email
     */
    console.log('the email-resolver');
    return this.emailService.getEmail(id).pipe(
      catchError( (err) => {
        this.router.navigateByUrl('/inbox/not-found');
        console.log('not-found in Resolver');
        /**
         * If anything happens and an error is catched the entire resolver is going to be cancelled
         * So we don't want to return anything, because the component will be cancelled and will not going to create an instance of it or use it
         *
         * This EMPTY is an empty OBSERVABLE that is returned completed in case of error, because catchError require to return an OBSERVABLE
         * the only reason we have to do this, is basically to make RxJS and TypeScript happy
         */
        return EMPTY;
      })
    );
  }


}
