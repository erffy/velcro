import Command from "../../../lib/structures/Command.js";

export default class extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Get bot ping.",

      cooldown: 10
    });
  };

  /**
   * @param {{ interaction: import("discord.js").CommandInteraction, shard: import("discord.js").WebSocketShard }} param0 
   */
  async execute({ interaction, shard }) {
    const embed = new this.Embed((e) => {
      e.setTitle(`${this.client.user.username} - Ping`)
        .setDescription(`- \`Cluster:\` **${this.client.cluster.id}**\n- \`Shard:\` **${shard.id}**`)
        .setFields([
          {
            name: "> Socket",
            value: `- \`${Math.round(this.client.ws.ping)}ms\``
          },
          {
            name: `> Shard`,
            value: `- \`${Math.round(shard.ping)}ms\``
          },
          {
            name: "> API",
            value: `- \`${Math.round(Date.now() - interaction.createdTimestamp)}ms\``
          }
        ])
    });

    this.pagination(interaction, { embeds: [embed] })
  };
};