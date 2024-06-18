import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/Controler.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './post.validation';
import responseHandler from '../../utils/ResponseHandler';
import PostModel from './post.model';

class PostController implements Controller {
  private post = PostModel;
  public path = '/posts';
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create,
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { title, body } = req.body;

      const post = await this.post.create({ title, body });

      responseHandler.createSuccessResponse({
        res,
        data: post,
        message: 'Post was created successfully',
        dataName: 'post',
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default PostController;
