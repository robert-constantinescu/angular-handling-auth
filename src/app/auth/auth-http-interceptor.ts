import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // here you can basically update any property of the request. Including it's url
    // by default the HTTP Client will ignore any cookies received unless we add the below `withCredentials` parameter
    // e.g: Authentication cookies
    const reqClone = req.clone({
      withCredentials: true,
    });
    return next.handle(reqClone);
  }


}
