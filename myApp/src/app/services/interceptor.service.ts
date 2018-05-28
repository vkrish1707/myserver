import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserSessionService } from './usersession.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private session: UserSessionService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.session.getjwt() != null) {
      req = req.clone({
        headers: req.headers.set("authorization", this.session.getjwt())
      });
    } else {
      req = req.clone({
        headers: req.headers.set("authorization", "null")
      });
    }
    return next.handle(req);
  }
}
