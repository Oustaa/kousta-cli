import { Request, Response } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import ResponseHandler from '@/utils/ResponseHandler';

function ErrorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
): void {
  const status = error.status || 500;

  ResponseHandler.sendErrorResponse(res, error.status || 500);
}

export default ErrorMiddleware;
