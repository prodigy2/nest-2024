import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500; // Default to Internal Server Error
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      // Handle HTTP-related exceptions
      status = exception.getStatus();
      message = exception.message;
    } else {
      // Handle other non-HTTP exceptions (e.g., validation errors, etc.)
      message = exception.message || message;
    }

    Logger.error(message, exception.stack, `${request.method} ${request.url}`);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
