import { TextInputBuilder } from "discord.js";

/**
 * @extends TextInputBuilder
 */
export default class TextInput extends TextInputBuilder {
  /**
   * Create new Text Input.
   * @param {import("discord.js").TextInputComponentData | ((input: TextInput) => unknown)} data
   * @constructor
   */
  constructor(data) {
    super((typeof data === "object" ? data : {}));

    if (typeof data === "function") data(this);
  };

  /**
   * Sets the custom id for this Text Input. 
   * @param {string} id 
   * @returns {this}
   *
   * @deprecated Please use 'setID' instead.
   * @private
   */
  setCustomId(id) {
    (deprecate(() => { }, "'setCustomId' is deprecated. Please use 'setID' instead."))();

    super.setCustomId(id);

    return this;
  };

  /**
   * Sets the maximum length of text for this Text Input.
   * @param {number} length
   * @returns {this}
   *
   * @deprecated Please use 'setLength' instead.
   * @private
   */
  setMaxLength(length) {
    (deprecate(() => { }, "'setMaxLength' is deprecated. Please use 'setLength' instead."))();

    super.setMaxLength(length);

    return this;
  };

  /**
   * Sets the minimum length of text for this Text Input.
   * @param {number} length
   * @returns {this}
   *
   * @deprecated Please use 'setLength' instead.
   * @private
   */
  setMinLength(length) {
    (deprecate(() => { }, "'setMinLength' is deprecated. Please use 'setLength' instead."))();

    super.setMinLength(length);

    return this;
  };

  /**
   * Sets the custom id for this Text Input. 
   * @param {string} id 
   * @returns {this}
   */
  setID(id) {
    super.setCustomId(id);

    return this;
  };

  /**
   * Set length.
   * @param {{ min?: number, max?: number }} options
   * @returns {this}
   */
  setLength(options = { min: null, max: null }) {
    let { min, max } = options;

    if (min) super.setMinLength(min);
    if (max) super.setMaxLength(max);

    return this;
  };
};