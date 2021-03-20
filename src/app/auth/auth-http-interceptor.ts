import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /** here you can basically update any property of the request. Including it's url
     * by default the HTTP Client will ignore any cookies received unless we add the below `withCredentials` parameter
     * e.g: Authentication cookies
     **/
    const reqClone = req.clone({
      withCredentials: true,
    });

    /** Behind the scenes, here will be returned an Observable, that is going to emit different events to describe the current status
     * of the request that we are making
     * and the RESPONSE that is coming back to us
     * So we can get some information about this from inside the INTERCEPTOR
     *
     * So overall the INTERCEPTOR is not just about intercepting and modifying the outgoing request
     * we can also use it take a look at the information that is coming back as well and handle it accordingly
     *
     * Lesson 304 -  The Modern Angular Bootcamp - Udemy
     */
    return next.handle(reqClone)
      .pipe(
        tap(val => {
          if (val.type === HttpEventType.Sent) {
            console.log('Request was sent to server');
          }

          if (val.type === HttpEventType.Response) {
            console.log('Got a response from the API', val);
          }
        })
      );
  }


}
