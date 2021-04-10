import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../login/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("currentToken");
        console.log(idToken + " AuthInterceptor");
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('x-access-token', idToken)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}