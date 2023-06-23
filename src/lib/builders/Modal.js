import { ModalBuilder } from "discord.js";
import { deprecate } from "node:util";

/**
 * @extends ModalBuilder
 */
export default class Modal extends ModalBuilder {
  /**
   * Create new Modal.
   * @param {import("discord.js").ModalComponentData | ((modal: Modal) => unknown)} data
   * @constructor
   */
  constructor(data) {
    super((typeof data === "object" ? data : {}));

    if (typeof data === "function") data(this);
  };

  /**
   * Add components to Modal.
   * @param {...(import("discord.js").ModalComponentData)} components 
   * @returns {this}
   *
   * @deprecated Please use 'add' instead.
   * @private
   */
  addComponents(...components) {
    (deprecate(() => { }, "'addComponents' is deprecated. Please use 'add' instead."))();

    super.addComponents(components);

    return this;
  };

  /**
   * Set components of Modal.
   * @param {...(import("discord.js").ModalComponentData)} components 
   * @returns {this}
   *
   * @deprecated Please use 'set' instead.
   * @private
   */
  setComponents(...components) {
    (deprecate(() => { }, "'setComponents' is deprecated. Please use 'set' instead."))();

    super.setComponents(components);

    return this;
  };

  /**
   * Sets the custom id for this Modal. 
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
   * Sets the custom id for this Modal. 
   * @param {string} id 
   * @returns {this}
   */
  setID(id) {
    super.setCustomId(id);

    return this;
  };

  /**
   * Set components of Modal.
   * @param {...(import("discord.js").ActionRowBuilder<import("discord.js").TextInputBuilder>)} components 
   * @returns {this}
   */
  set(...components) {
    super.setComponents(components);

    return this;
  };

  /**
   * Add components to Modal.
   * @param {...(import("discord.js").ActionRowBuilder<import("discord.js").TextInputBuilder>)} components 
   * @returns {this}
   */
  add(...components) {
    super.addComponents(components);

    return this;
  };

  /**
   * Create new same Modal.
   * @param {import("discord.js").ModalComponentData} data
   * @param {?((modal: Modal) => unknown)} fncallback
   * @returns {Modal}
   */
  from(fncallback) {
    const builder = ModalBuilder.from(this.toJSON());
    if (fncallback && typeof fncallback === "function") fncallback(builder);

    return builder;
  };
};