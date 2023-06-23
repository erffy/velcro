import Event from "../../lib/structures/Event.js";

export default class extends Event {
  constructor(client) {
    super(client, {
      name: "interactionCreate",
      description: "Interacting with slash commands."
    });
  };

  /**
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    let client = this.client;

    const command = (client.loader.commands.has(interaction.command?.name) ? client.loader.commands.get(interaction.command.name) : null);
    if (!command) return interaction.reply({ content: `- This command is currently unavailable.`, ephemeral: true });

    const channel = interaction.channel;
    const guild = interaction.guild;
    const shard = interaction.guild.shard;
    const member = interaction.member;
    const user = interaction.user;

    if (this.cooldowns.has(`${member.id}.${command.data.name}`)) {
      const end = this.cooldowns.get(`${member.id}.${command.data.name}`);

      const date = new Date();
      const remainingSeconds = Math.floor((end - date) / 1000);

      const remainingTimestamp = new Date(remainingSeconds * 1000).getTime();

      return interaction.reply({ content: `- Try again in <t:${remainingTimestamp}:R>.`, ephemeral: true });
    };

    let execute = command.execute({ interaction, channel, guild, shard, member, user });

    if (execute?.then) {
      execute.catch((error) => {
        console.error(error);

        let embed = new this.Embed((e) => e.setTitle("An Error Ocurred").setDescription(`- This command has some errors.`))
          .setFooter({ text: `Detailed information sended to developers.` })
          .setFields({ name: `> Error`, value: `- \`${error}\`` });

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }).then(() => {
        if (this.check(member.id).isDeveloper()) return;

        if (command.data.cooldown > 0) {
          let finish = (new Date());
          finish.setSeconds(finish.getSeconds() + command.data.cooldown);

          this.cooldowns.set(`${member.id}.${command.data.name}`, finish);
          setTimeout(() => this.cooldowns.delete(`${member.id}.${command.data.name}`), (command.data.cooldown * 1000))
        };
      });
    };

    return void 0;
  };
};