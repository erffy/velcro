import Event from '../../../lib/structures/Event.js';

export default class extends Event {
  constructor(client) {
    super(client, {
      name: 'ready'
    });
  };

  async execute() {
    'I';
  };
};