'use strict';

import Emitter from "@smootie/emitter";
import ora from "ora";

import sync from "../utils/Sync.js";
import Storage from "../utils/Storage.js";

export default class Loader extends Emitter {
  /**
   * @param {import("../Client.js").default} client
   * @constructor
   */
  constructor(client) {
    super();
    
    Object.defineProperty(this, 'client', { value: client, enumerable: false, writable: false, configurable: false });

    /**
     * @type {{ 
        slash: import("discord.js").Collection<string, import("../structures/Command").default>, 
        message: import("discord.js").Collection<string, import("../structures/MessageCommand").default> 
       }}
     */
    this.commands = {
      slash: Storage({ name: "commands.slash" }),
      message: Storage({ name: "commands.message" })
    };

    /**
     * @type import("discord.js").Collection<string, import("../structures/Event").default>
     */
    this.events = Storage({ name: "events" });

    /**
     * @type import("discord.js").Collection<string, import("../structures/Event").default>
     */
    this.handlers = Storage({ name: "handlers" });
  };

  async Event() {
    const spinner = ora("Loading Events").start();

    const __results = sync("/**/src/bot/**/events/**/*.js");

    let total = __results.length;
    let loaded = 0;

    for (const __event of __results) {
      let startTime = new Date();

      /**
       * @type import("../structures/Event.js").default
       */
      const event = (new ((await (import(__event)).catch(console.error)).default)(this.client));
      let options = event.options;

      if (options?.name) {
        let type = (options?.type === "REST_CLIENT" ? "rest" : (options?.type === "WEBSOCKET_CLIENT" ? "ws" : options.type.toLowerCase()));

        if (!options?.enabled) break;

        loaded++;

        this.emit("eventLoaded", event);
        this.events.set(options.name, event);

        if (type === "client") this.client[options.once ? "once" : "on"](options.name, (...args) => this.#HandleAsync(event, ...args));
        else if (type === "rest" || type === "ws") this.client[type][options.once ? "once" : "on"](options.name, (...args) => this.#HandleAsync(event, ...args));
        else process[options.once ? "once" : "on"](options.name, (...args) => event.execute(...args));
      };

      let endTime = new Date();

      if (typeof event?.onLoad === "function") event.onLoad(startTime - endTime);

      spinner.text = `${spinner.text} (${loaded}/${total})`;
    };

    this.emit("eventsReady", 0);

    spinner.succeed(`Events Loaded. (${loaded}/${total})`);

    return void 0;
  };

  async Handler() {
    const spinner = ora("Loading Handlers").start();

    const __results = sync("/**/src/bot/**/handlers/**/*.js");

    let total = __results.length;
    let loaded = 0;

    for (const __handler of __results) {
      let startTime = new Date();

      /**
       * @type import("../structures/Event.js").default
       */
      const handler = (new ((await (import(__handler)).catch(console.error)).default)(this.client));
      let options = handler.options;

      if (options?.name) {
        let type = (options?.type === "REST_CLIENT" ? "rest" : (options?.type === "WEBSOCKET_CLIENT" ? "ws" : options.type.toLowerCase()));

        if (!options?.enabled) break;

        loaded++;

        this.emit("handlerLoaded", handler);
        this.handlers.set(options.name, handler);

        if (type === "client") this.client[options.once ? "once" : "on"](options.name, (...args) => this.#HandleAsync(handler, ...args));
        else if (type === "rest" || type === "ws") this.client[type][options.once ? "once" : "on"](options.name, (...args) => this.#HandleAsync(handler, ...args));
        else process[options.once ? "once" : "on"](options.name, (...args) => handler.execute(...args));
      };

      let endTime = new Date();

      if (typeof handler?.onLoad === "function") handler.onLoad(endTime - startTime);

      spinner.text = `${spinner.text} (${loaded}/${total})`;
    };

    this.emit("handlersReady", 0);

    spinner.succeed(`Handlers Loaded. (${loaded}/${total})`);

    return void 0;
  };

  async Command() {
    const spinner = ora("Loading Commands").start();

    const __results = sync("/**/src/bot/**/commands/**/*.js");

    let total = __results.length;
    let loaded = 0;

    for (const __command of __results) {
      let startTime = new Date();

      /**
       * @type import("../structures/Command.js").default
       */
      const command = (new ((await (import(__command)).catch(console.error)).default)(this.client));
      let data = command.data;

      if (data?.name) {
        if (!data?.enabled) break;

        loaded++;

        this.emit("commandLoaded", command);
        this.commands.set(data.name, command);
      };

      let endTime = new Date();

      if (typeof command?.onLoad === "function") command.onLoad(endTime - startTime);

      spinner.text = `${spinner.text} (${loaded}/${total})`;
    };

    this.emit("commandsReady", 0);

    spinner.succeed(`Commands Loaded. (${loaded}/${total})`);

    return void 0;
  };

  async Setup() {
    await this.Event();
    await this.Command();

    this.emit("ready", true);
    
    return void 0;
  };

  /**
   * @param {import("../structures/Event.js").default} event 
   * @param {...any} args
   * @returns {void}
   */
  #HandleAsync(event, ...args) {
    let firstArg = args[0];

    switch (event.options.name) {
      case "interactionCreate": {
        if (firstArg.isCommand()) event.execute(...args);
        else if (firstArg.isAnySelectMenu()) event.execute(...args);
        else if (firstArg.isButton()) event.execute(...args);

        break;
      };

      default: event.execute(...args); break;
    };

    return void 0;
  };
};