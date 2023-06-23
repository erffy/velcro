import { ButtonBuilder } from "discord.js";
import { deprecate } from "node:util";

/**
 * @extends ButtonBuilder
 */
export default class Button extends ButtonBuilder {
  /**
   * Create new Button.
   * @param {import("discord.js").ButtonComponentData | (button: Button) => unknown} data
   * @constructor
   */
  constructor(data) {
    super((typeof data === "object" ? data : {}));

    if (typeof data === "function") data(this);
  };

  get disabled() {
    return (super.setDisabled(true));
  };

  /**
   * Sets the custom id for this Button. 
   * @param {string} id 
   * @returns {this}
   *
   * @deprecated Please use 'setID' instead.
   * @private
   */
  setCustomId(id) {
    (deprecate(() => { }, "'setCustomId' is deprecated. Please use 'setID' instead."))();

    return (super.setCustomId(id));
  };

  /**
   * Sets whether this button is disabled.
   * @param {boolean} disabled
   * @returns {this}
   *
   * @deprecated Please use 'disabled' instead.
   * @private
   */
  setDisabled(disabled) {
    (deprecate(() => { }, "'setDisabled' is deprecated. Please use 'disabled' instead."))();

    return (super.setDisabled(disabled));
  };

  /**
   * Sets the custom id for this Button. 
   * @param {string} id 
   * @returns {this}
   */
  setID(id) {
    return (super.setCustomId(id));
  };

  /**
   * Create new same Button.
   * @param {import("discord.js").ButtonComponentData} data
   * @param {?((button: Button) => unknown)} fncallback
   * @returns {Button}
   */
  from(fncallback) {
    const builder = ButtonBuilder.from(this.toJSON());
    if (fncallback && typeof fncallback === "function") fncallback(builder);

    return builder;
  };
};