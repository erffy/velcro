import { ButtonBuilder, ButtonComponentData } from "discord.js";

export default class Button extends ButtonBuilder {
  public constructor(data?: ButtonComponentData | ((button: Button) => unknown));

  private setCustomId(id: string): this;
  private setDisabled(disabled: boolean): this;

  public readonly disabled: this;

  public setID(id: string): this;
  public from(fncallback?: ((button: Button) => unknown)): Button;
};