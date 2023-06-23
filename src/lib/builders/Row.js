import { ActionRowBuilder } from "discord.js";
import { deprecate } from "node:util";

/**
 * @extends ActionRowBuilder
 */
export default class Row extends ActionRowBuilder {
  /**
   * Create new Action Row.
   * @param {import("discord.js").ActionRowData | ((row: Row) => unknown)} data
   * @constructor
   */
  constructor(data) {
    super((typeof data === "object" ? data : {}));

    if (typeof data === "function") data(this);
  };

  /**
   * Add components to Row.
   * @param {...(import("discord.js").AnyComponentBuilder)} components 
   * @returns {this}
   *
   * @deprecated Please use 'add' instead.
   * @private
   */
  addComponents(...components) {
    (deprecate(() => {}, "'addComponents' is deprecated. Please use 'add' instead."))();

    super.addComponents(components);

    return this;
  };

  /**
   * Set components of Row. 
   * @param {...(import("discord.js").AnyComponentBuilder)} components
   * @returns {this}
   *
   * @deprecated Please use 'set' instead.
   * @private
   */
  setComponents(...components) {
    (deprecate(() => {}, "'setComponents' is deprecated. Please use 'set' instead."))();

    super.setComponents(components);

    return this;
  };

  /**
   * Add components to Row.
   * @param  {...(import("discord.js").AnyComponentBuilder)} components 
   * @returns {this}
   */
  add(...components) {
    return (super.addComponents(components));
  };

  /**
   * Set components of Row.
   * @param  {...(import("discord.js").AnyComponentBuilder)} components 
   * @returns {this}
   */
  set(...components) {
    return (super.setComponents(components));
  };

  /**
   * Create new same Row.
   * @param {import("discord.js").ActionRowData} data
   * @param {?((row: Row) => unknown)} fncallback
   * @returns {Row}
   */
  from(fncallback) {
    /**
     * @type Row
     */
    const builder = new this.constructor[Symbol.species](this.toJSON());
    if (fncallback && typeof fncallback === "function") fncallback(builder);

    return builder;
  };
};