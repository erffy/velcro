import { Collection, ChannelType, ComponentType, WebhookClient, CommandInteraction } from "discord.js";

import Client from "../client/Client";
import Checker from "../client/Checker";
import config from "../../bot.config";

import Row from "../builders/Row";
import Attachment from "../builders/Attachment";
import Button from "../builders/Button";
import ContextCommand from "../builders/ContextCommand";
import Embed from "../builders/Embed";
import Menu from "../builders/Menu";
import Modal from "../builders/Modal";
import SlashCommand from "../builders/SlashCommand";
import TextInput from "../builders/TextInput";

export default abstract class Base {
  public constructor(client: Client);

  public readonly client: Client;
  public readonly cooldowns: Collection<string, number>;
  public readonly webhook: WebhookClient;
  public readonly config: typeof config;

  public Embed: typeof Embed;
  public Button: typeof Button;
  public Modal: typeof Modal;
  public Row: typeof Row;
  public TextInput: typeof TextInput;
  public Attachment: typeof Attachment;
  public Menu: typeof Menu;

  public SlashCommand: typeof SlashCommand;
  public ContextCommand: typeof ContextCommand;

  public Collection: typeof Collection;

  public ChannelType: typeof ChannelType;
  public ComponentType: typeof ComponentType;

  public check(data?: any): Checker;

  public pagination(interaction: CommandInteraction, { embeds = [], buttons = [] }: { embeds: Array<Embed>, buttons: Array<Button> }): Promise<void>;
};