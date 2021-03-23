import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Email} from './email';
import {Observable} from 'rxjs';
import {EmailService} from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService  implements Resolve<Email>{

  constructor(private emailService: EmailService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Email> | Promise<Email> | Email {
    // i hope that i will remember that is just some syntactic sugar to get directly the id parameter of the object returned by route.params
    const { id } = route.params;


    /**
     * we can return immediately an EMAIL, or we can return an OBSERVABLE that will eventually emit an EMAIL or a PROMISE
     *
     * my getEmail() method returns an OBSERVABLE that eventually emits an email
     */
    return this.emailService.getEmail(id);
  }


}
