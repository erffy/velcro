'use strict';

import { Client as BaseClient, IntentsBitField as Intents, Partials } from "discord.js";
import { getInfo, ClusterClient } from "discord-hybrid-sharding";
import { BitField, enumToObject } from "@sapphire/bitfield";
import logs from "discord-logs";

import Loader from "./Loader.js";

export default class Client extends BaseClient {
  constructor(token = process.env["TOKEN"]) {
    const sharding = getInfo();

    super({
      shardCount: sharding.TOTAL_SHARDS,
      shards: sharding.SHARD_LIST,

      intents: (new BitField(enumToObject(Intents.Flags))).mask,
      partials: [Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User],
    });

    logs(this);

    this.token = token;

    /**
     * Client Cluster.
     * @type ClusterClient<this>
     */
    Object.defineProperty(this, "cluster", { value: (new ClusterClient(this)), enumerable: false, writable: false, configurable: false });

    /**
     * Loader.
     * @type Loader
     */
    this.loader = new Loader(this);
  };

  login() {
    this.loader.once("ready", () => {
      (super.login(this.token)).then(async () => {
        let commands = [];
        console.log(`[Client] Connected.`);
  
        for (const command of this.loader.commands.toJSON()) commands.push(command.commandData);
        
        await this.application.commands.set(commands);
  
        console.log(`[Loader] Commands ready.`);
      });
    });

    this.loader.Setup();

    return void 0;
  };
};

(new Client()).login();