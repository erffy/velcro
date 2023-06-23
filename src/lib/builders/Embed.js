import { EmbedBuilder } from "discord.js";

/**
 * @extends EmbedBuilder
 */
export default class Embed extends EmbedBuilder {
  /**
   * Create new Emnbed.
   * @param {import("discord.js").EmbedData | ((embed: Embed) => unknown)} data
   * @constructor
   */
  constructor(data) {
    super((typeof data === "object" ? data : {}));

    if (typeof data === "function") data(this);
  };

  /**
   * Create new same Embed.
   * @param {import("discord.js").EmbedData} data
   * @param {?((embed: Embed) => unknown)} fncallback
   * @returns {Embed}
   */
  from(fncallback) {
    const builder = EmbedBuilder.from(this.toJSON());
    if (fncallback && typeof fncallback === "function") fncallback(builder);

    return builder;
  };
};