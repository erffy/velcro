import { SlashCommandBuilder } from "discord.js";

export default class SlashCommand extends SlashCommandBuilder {
  public constructor(slcallback?: (command: SlashCommand) => unknown);

  private setNameLocalization(): this;
  private setNameLocalizations(): this;
  private setDescriptionLocalization(): this;
  private setDescriptionLocalizations(): this;
};