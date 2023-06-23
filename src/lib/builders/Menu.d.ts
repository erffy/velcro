import { 
  BaseSelectMenuBuilder,

  RoleSelectMenuBuilder, UserSelectMenuBuilder, StringSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder 
} from "discord.js";

export default class Menu extends BaseSelectMenuBuilder {
  public constructor(data?: Partial<any> | ((menu: Menu) => unknown));

  private setCustomId(id: string): this;

  public setID(id: string): this;

  static StringMenu = StringSelectMenuBuilder;
  static RoleMenu = RoleSelectMenuBuilder;
  static UserMenu = UserSelectMenuBuilder;
  static ChannelMenu = ChannelSelectMenuBuilder;
  static MentionMenu = MentionableSelectMenuBuilder;
};