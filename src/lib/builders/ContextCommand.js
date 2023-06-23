import { ContextMenuCommandBuilder, ApplicationCommandType } from "discord.js";

/**
 * @extends ContextMenuCommandBuilder
 */
export default class ContextCommand extends ContextMenuCommandBuilder {
  /**
   * Create new Context Menu-Command.
   * @param {(command: ContextCommand) => unknown} cccallback
   * @constructor
   */
  constructor(cccallback) {
    super();

    if (typeof cccallback === "function") cccallback(this);
  };

  /**
   * Sets a name localization for this Command.
   * @param {import("discord.js").LocalizationMap} locale 
   * @returns {this}
   *
   * @deprecated Please use 'setLocalization' instead.
   * @private
   */
  setNameLocalization(locale, content) {
    (deprecate(() => { }, "'setNameLocalization' is deprecated. Please use 'setLocalization' instead."))();

    super.setNameLocalization(locale, content);

    return this;
  };

  /**
   * Sets a name localizations for this Command.
   * @param {import("discord.js").LocalizationMap} locale 
   * @returns {this}
   *
   * @deprecated Please use 'setLocalization' instead.
   * @private
   */
  setNameLocalizations(locale, content) {
    (deprecate(() => { }, "'setNameLocalizations' is deprecated. Please use 'setLocalization' instead."))();

    super.setNameLocalizations(locale, content);

    return this;
  };

  /**
   * Set localizations of Slash-Command.
   * @param  {...({ locale?: import("discord.js").LocalizationMap, content: string })} localizations
   * @returns {this}
   */
  setLocalization(...localizations) {
    let __localizations = [];

    for (let { locale, content } of localizations) {
      if (typeof content !== "string") content = String(content);

      __localizations.push({ [locale]: content });
    };

    if (__localizations.length > 0) super.setNameLocalizations(...__localizations);

    return this;
  };

  /**
   * @type typeof ApplicationCommandType
   * @static
   */
  static ApplicationType = ApplicationCommandType;
};