import { ContextMenuCommandBuilder, ApplicationCommandType, LocalizationMap } from "discord.js";

export default class ContextCommand extends ContextMenuCommandBuilder {
  public constructor(cccallback?: ((command: ContextCommand) => unknown));

  private setNameLocalization(locale: LocalizationMap, content: string): this;
  private setNameLocalizations(locale: LocalizationMap, content: string): this;

  public setLocalization(...localizations: Array<{ locale: LocalizationMap, content: string }>): this;
};