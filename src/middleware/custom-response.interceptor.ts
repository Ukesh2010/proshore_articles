import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class CustomSuccessResponseInterceptor<T> implements NestInterceptor {
  logger = new Logger();
  constructor() {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const path = req.route.path;
    const method = req.method;

    return next.handle().pipe(
      map(async (res) => {
        const response = ctx.getResponse();
        const delay = Date.now() - now;
        this.logger.log(
          `Logging HTTP request ${req.method} ${req.url} ${response.statusCode} +${delay}ms`,
        );

        return {
          success: true,
          data: res,
          message: 'Request successfully executed!!',
        };
      }),
    );
  }
}
