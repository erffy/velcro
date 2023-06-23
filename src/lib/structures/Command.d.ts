import { ApplicationCommandOptionData, ApplicationCommandData, CommandInteraction, Guild, TextBasedChannel, User, GuildMember, WebSocketShard } from "discord.js";

import Base from "./Base";
import Client from "../Client/Client";

export default abstract class Command extends Base {
  public constructor(client: Client, options?: CommandOptions);

  public readonly commandData: ApplicationCommandData[];
  public readonly data: CommandData;

  public execute(args: CommandExecute): Promise<void>;
  public onLoad(): void;
  public onError(): void;
};

export interface CommandOptions {
  name: string;
  description: string;
  cooldown?: number;
  enabled?: boolean;
  development?: boolean;
  options?: ApplicationCommandOptionData[];
};

export interface CommandData {
  name: string;
  description: string;
  cooldown: number;
  enabled?: boolean;
  development?: boolean;
};

export interface CommandExecute {
  interaction: CommandInteraction;
  guild: Guild;
  channel: TextBasedChannel;
  user: User;
  member: GuildMember;
  shard: WebSocketShard;
};