import Event from '../../../lib/structures/Event.js';

export default class extends Event {
  constructor(client) {
    super(client, {
      name: 'debug',
      description: 'Debugging.'
    });
  };

  async execute(message) {
    this.webhook.send({ content: message });
  };
};