// common-exceptions.interceptor.ts
import {
  Injectable, NestInterceptor,
  ExecutionContext, CallHandler,
  HttpException, HttpStatus
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CommonExceptionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof HttpException) {
          return throwError(() => error);
        }
        console.error("\nERROR ENCONTRADO\n");
        console.error(error);
        return throwError(() =>
          new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
      }),
    );
  }
}
