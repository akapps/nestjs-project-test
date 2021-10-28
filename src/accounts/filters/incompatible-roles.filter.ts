import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

export class IncompatibleRolesError extends Error {}

@Catch(IncompatibleRolesError)
export class IncompatibleRolesFilter implements ExceptionFilter {
  catch(exception: IncompatibleRolesError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(403).json({
      message: exception.message,
    });
  }
}
