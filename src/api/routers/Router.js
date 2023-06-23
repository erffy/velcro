import { s } from '@sapphire/shapeshift';
import { Router as BaseRouter } from 'express';

export default class Router {
  /**
   * Create new Router.
   * @param {{ name: string, routerOptions?: import("express").RouterOptions }} options
   * @constructor 
   */
  constructor(options = { name: null }) {
    let { name } = options;

    s.string.parse(name);

    /**
     * @type string
     * @readonly
     */
    this.name = name;

    /**
     * @type BaseRouter
     * @readonly
     */
    this.router = BaseRouter(options?.routerOptions);
  };

  /**
   * Router callback.
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   * @returns {import("express").Router}
   */
  execute(request, response, next) {
    return this.router;
  };
};