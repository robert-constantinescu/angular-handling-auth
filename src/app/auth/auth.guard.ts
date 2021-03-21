import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {skipWhile, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {


  constructor(private authService: AuthService,
              private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // some logic to decide if the user is having access to the route this Guard was added
    console.log('can load: ', this.authService.signedin$);
    return this.authService.signedin$
      .pipe(
        // skipWhile(val => val === null),
        take(1),
        tap((authenticated) => {
          console.log('the TAP', authenticated);
          if (!authenticated) {
            console.log('the TAP-IF');
            this.router.navigateByUrl('/');
          }
        })
      );
  }
}
