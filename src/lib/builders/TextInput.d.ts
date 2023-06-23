import { TextInputBuilder, TextInputComponentData } from "discord.js";

export default class TextInput extends TextInputBuilder {
  public constructor(data?: TextInputComponentData | ((input: TextInput) => unknown));

  private setCustomId(id: string): this;
  private setMaxLength(length: number): this;
  private setMinLength(length: number): this;

  public setID(id: string): this;
  public setLength(options: LengthOptions): this;
};

interface LengthOptions {
  min?: number;
  max?: number;
};