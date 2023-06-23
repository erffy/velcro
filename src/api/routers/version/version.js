import Router from "../Router.js";

export default class extends Router {
  constructor() {
    super({
      name: "version"
    });

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res
     */
    this.execute = (req, res) => {
      res.send({ message: "working!" });

      return this.router;
    };
  };
};