import { s } from "@sapphire/shapeshift";

import Base from "./Base.js";

/**
 * @extends Base
 * @abstract
 */
export default class Event extends Base {
  /**
   * @param {*} client 
   * @param {import("./Event").EventOptions} options
   * @constructor
   */
  constructor(client, options) {
    super(client);

    let { name, description, enabled, development, once, type } = options;
    description ??= "Super event.";

    enabled ??= true;
    development ??= false;
    once ??= false;

    type ??= "CLIENT";

    s.string.parse(name);
    s.string.parse(description);

    s.boolean.parse(enabled);
    s.boolean.parse(development);
    s.boolean.parse(once);

    s.string.parse(type);

    Object.defineProperty(this, "options", {
      value: { name, description, enabled, development, once, type }, enumerable: true, writable: false, configurable: false
    });
  };

  /**
   * Determine what to do when the event loads.
   * @returns {void}
   */
  onLoad() {
    return void 0;
  };

  /**
   * Determine what to do when there is an error in the event.
   * @returns {void}
   */
  onError() {
    return void 0;
  };

  /**
   * Determine what to do when the event is run.
   * @returns {Promise<void>}
   */
  async execute() {
    return void 0;
  };
};