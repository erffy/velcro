import { SlashCommandBuilder } from "discord.js";

/**
 * @extends SlashCommandBuilder
 */
export default class SlashCommand extends SlashCommandBuilder {
  /**
   * Create new Slash-Command.
   * @param {(command: SlashCommand) => unknown} slcallback
   * @constructor
   */
  constructor(slcallback) {
    super();

    if (typeof slcallback === "function") slcallback(this);
  };

  /**
   * Sets a name localization for this Command.
   * @param {import("discord.js").LocalizationMap} id 
   * @returns {this}
   *
   * @deprecated Please use 'setLocalization' instead.
   * @private
   */
  setNameLocalization(locale, content) {
    (deprecate(() => {}, "'setNameLocalization' is deprecated. Please use 'setLocalization' instead."))();

    super.setNameLocalization(locale, content);

    return this;
  };

  /**
   * Sets a description localization for this Command.
   * @param {import("discord.js").LocalizationMap} id 
   * @returns {this}
   *
   * @deprecated Please use 'setLocalization' instead.
   * @private
   */
  setDescriptionLocalization(locale, content) {
    (deprecate(() => {}, "'setDescriptionLocalization' is deprecated. Please use 'setLocalization' instead."))();

    super.setDescriptionLocalization(locale, content);

    return this;
  };

  /**
   * Sets a description localizations for this Command.
   * @param {import("discord.js").LocalizationMap} id 
   * @returns {this}
   *
   * @deprecated Please use 'setLocalizations' instead.
   * @private
   */
  setDescriptionLocalizations(locale, content) {
    (deprecate(() => {}, "'setDescriptionLocalizations' is deprecated. Please use 'setLocalization' instead."))();

    super.setDescriptionLocalizations(locale, content);

    return this;
  };

  /**
   * Sets a name localization for this Command.
   * @param {import("discord.js").LocalizationMap} id 
   * @returns {this}
   *
   * @deprecated Please use 'setLocalization' instead.
   * @private
   */
  setNameLocalization(locale, content) {
    (deprecate(() => {}, "'setNameLocalization' is deprecated. Please use 'setLocalization' instead."))();

    super.setNameLocalization(locale, content);

    return this;
  };

  /**
   * Sets a name localizations for this Command.
   * @param {import("discord.js").LocalizationMap} id 
   * @returns {this}
   *
   * @deprecated Please use 'setLocalization' instead.
   * @private
   */
  setNameLocalizations(locale, content) {
    (deprecate(() => {}, "'setNameLocalizations' is deprecated. Please use 'setLocalization' instead."))();

    super.setNameLocalizations(locale, content);

    return this;
  };

  /**
   * Set localizations of Slash-Command.
   * @param  {...({ type: "description" | "name", locale?: import("discord.js").LocalizationMap, content: string })} localizations
   * @returns {this}
   */
  setLocalization(...localizations) {
    let nameLocalizations = [];
    let descriptionLocalizations = [];

    for (let { type, locale, content } of localizations) {
      type = type.toLowerCase();

      if (typeof content !== "string") content = String(content);

      if (type === "description") descriptionLocalizations.push({ [locale]: content });
      else if (type === "name") nameLocalizations.push({ [locale]: content });
    };

    if (nameLocalizations.length > 0) super.setNameLocalizations(...nameLocalizations);
    if (descriptionLocalizations.length > 0) super.setDescriptionLocalizations(...descriptionLocalizations);

    return this;
  };
};