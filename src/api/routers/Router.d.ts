import { RouterOptions as BaseRouterOptions, IRouter, Response, Request, NextFunction } from 'express';

export default class Router {
  public constructor(options: RouterOptions);

  public readonly name: string;
  public readonly router: IRouter;

  public execute(request: Request, response: Response, next: NextFunction): typeof this.router;
};

interface RouterOptions {
  name: string;
  routerOptions?: BaseRouterOptions;
};