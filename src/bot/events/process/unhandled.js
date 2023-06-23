import Event from '../../../lib/structures/Event.js';

export default class extends Event {
  constructor(client) {
    super(client, {
      name: 'unhandledRejection',
      description: 'Catch errors.'
    });
  };

  /**
   * @param {Error} error 
   */
  async execute(error) {
    let file = "Unknown";
    let line = 0;
    let description = null;

    if (error.message.startsWith('DiscordAPIError')) description = `A Discord API error occurred: ${error.message}`;
    else {
      const match = error.stack.split('\n')[1].match(/\((.*):(\d+):\d+\)/);
      let __error = `${error.stack.substring(0, (error.stack.length - 100))}...`;

      file = match[1];
      line = match[2];
      description = `## File\n- \`${file}\`\n### Line\n- \`${line}\` \n## Error\n\`\`\`js\n${__error}\`\`\``;
    };

    const embed = new this.Embed((e) => e.setTitle('Error Received.').setDescription(description)).setTimestamp().setColor("Red");

    let __dev = this.config.Bot.developers.map((e) => e);

    this.webhook.send({ embeds: [embed], content: `> ${__dev}` });

    return void 0;
  };
};