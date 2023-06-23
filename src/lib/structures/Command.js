import { s } from "@sapphire/shapeshift";

import Base from "./Base.js";

/**
 * @extends Base
 * @abstract
 */
export default class Command extends Base {
  /**
   * @param {*} client 
   * @param {import("./Command").CommandOptions} options 
   * @constructor
   */
  constructor(client, options) {
    super(client);

    let { name, description, options: commandDataOptions, enabled, development, cooldown } = options;
    enabled ??= true;
    development ??= false;
    cooldown ??= 0;

    s.string.parse(name);
    s.string.parse(description);

    s.number.parse(cooldown);

    s.boolean.parse(enabled);
    s.boolean.parse(development);

    /**
     * @type import("./Command").CommandData
     * @readonly
     */
    this.commandData = { name, description, options: commandDataOptions };

    /**
     * @type import("./Command").CommandOptions
     * @readonly
     */
    this.data = options;
  };

  /**
   * Determine what to do when the command loads.
   * @returns {void}
   */
  onLoad() {
    return void 0;
  };

  /**
   * Determine what to do when there is an error in the command.
   * @returns {void}
   */
  onError() {
    return void 0;
  };

  /**
   * Determine what to do when the command is run.
   * @returns {Promise<void>}
   */
  async execute() {
    return void 0;
  };
};