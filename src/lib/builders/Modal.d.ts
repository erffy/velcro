import { ModalBuilder, ModalComponentData, ActionRowBuilder, TextInputBuilder } from "discord.js";

export default class Modal extends ModalBuilder {
  public constructor(data?: ModalComponentData | ((modal: Modal) => unknown));

  private setCustomId(id: string): this;
  private addComponents(...components: ActionRowBuilder<TextInputBuilder>): this;
  private setComponents(...components: ActionRowBuilder<TextInputBuilder>): this;

  public setID(id: string): this;
  public add(...components: ActionRowBuilder<TextInputBuilder>): this;
  public set(...components: ActionRowBuilder<TextInputBuilder>): this;
};