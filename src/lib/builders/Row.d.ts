import { ActionRowBuilder, ActionRowData, AnyComponentBuilder } from "discord.js";

export default class Row extends ActionRowBuilder {
  public constructor(data?: ActionRowData | ((row: Row) => unknown));

  private addComponents(...components: AnyComponentBuilder): this;
  private setComponents(...components: AnyComponentBuilder): this;

  public add(...components: AnyComponentBuilder): this;
  public set(...components: AnyComponentBuilder): this;
};