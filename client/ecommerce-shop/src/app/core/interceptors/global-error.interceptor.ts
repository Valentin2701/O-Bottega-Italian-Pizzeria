import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.errorService.setError(error.error.message || 'An unknown error occurred');
        return throwError(() => error);
      })
    );
  }
}

export const GlobalErrorInterceptorProvider: Provider = {
  useClass: GlobalErrorInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS
}