import { EmbedBuilder, EmbedData, EmbedField } from "discord.js";

export default class Embed extends EmbedBuilder {
  public constructor(data?: EmbedData | ((embed: Embed) => unknown));

  public addFields(...fields: EmbedField[]): this;
};