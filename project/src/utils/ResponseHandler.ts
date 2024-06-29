import { Response } from 'express';
import logger from './Logger';
import { PaginationMetaData } from "../kousta/@utils/getpagination";

export default class ResponseHandler {
  private static logger = logger;

  private constructor() {}

  public static findSuccessResponse(arg1: {
    res: Response;
    data: any[];
    dataName?: string;
  }): Response {
    return arg1.res.status(200).json({
      [arg1.dataName || 'data']: arg1.data,
    });
  }

  public static createSuccessResponse(arg1: {
    res: Response;
    message: string;
    data: any;
    dataName?: string;
  }): Response {
    return this.sendSuccessResponse({
      ...arg1,
      code: 201,
    });
  }

  public static updateSuccessResponse(arg1: {
    res: Response;
    message: string;
    data: any;
    dataName?: string;
  }): Response {
    return this.sendSuccessResponse({
      ...arg1,
      code: 200,
    });
  }

  public static deleteSuccessResponse(arg1: {
    res: Response;
    deleteCount: number;
    dataName?: string;
  }): Response {
    if (arg1.deleteCount < 0) {
      return this.notFoundError(arg1.res, arg1.dataName);
    }

    return this.sendSuccessResponse({
      ...arg1,
      code: 204,
    });
  }

  // SUCCCESS RESPONSES
  public static sendSuccessResponse(arg1: {
    res: Response;
    message?: string;
    code: 200 | 201 | 203 | 204;
    data?: any;
    dataName?: string;
    meta?: PaginationMetaData;
  }): Response {
    const { res, message, code, data, dataName, meta } = arg1;

    ResponseHandler.logger.log(
      `a request has been made and proccessed successfully at: ${new Date()}`,
      'info',
    );

    res.status(code);

    if (code === 204) {
      return res.end();
    }

    return res.send({
      message,
      [dataName || "data"]: data,
      meta,
    });
  }

  // ERRORS RESPONSES
  public static notFoundError(res: Response, dataName?: string): Response {
    const message = `${dataName || 'data'} was not found`;
    ResponseHandler.logger.log(message, 'warn');

    return res.send(404).send({ message });
  }

  public static unauthorizedError(res: Response): Response {
    ResponseHandler.logger.log(
      `a request has been made by an unauthorized user at : ${new Date()}`,
      'warn',
    );

    return res.send(401).end();
  }

  public static paymentRequiredError(res: Response): Response {
    // FIXME: fix this please in the future, asap.
    ResponseHandler.logger.log(
      `a request has been made by an unauthorized user at : ${new Date()}`,
      'warn',
    );

    return res.send(402).end();
  }

  public static forbiddenError(res: Response): Response {
    ResponseHandler.logger.log(
      `a request has been made by a not allowed user at : ${new Date()}`,
      'warn',
    );

    return res.send(403).end();
  }

  public static serverError(res: Response): Response {
    ResponseHandler.logger.log(`server error : ${new Date()}`, 'warn');

    return res.send(500).end();
  }

  public static sendErrorResponse(res: Response, code: number): Response {
    switch (code) {
      case 401:
        return this.unauthorizedError(res);
      case 402:
        return this.paymentRequiredError(res);
      case 403:
        return this.forbiddenError(res);
      case 404:
        return this.notFoundError(res);
      default:
        return this.serverError(res);
    }
  }
}
