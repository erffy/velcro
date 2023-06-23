import { Collection } from "discord.js";
import Emitter from "@smootie/emitter";

import Client from "./Client";

import Command from "../structures/Command";
import Event from "../structures/Event";

export default class Loader extends Emitter<LoaderEvents> {
  public constructor(client: Client);

  public readonly commands: Collection<string, Command>;
  public readonly events: Collection<string, Event>;
  public readonly handlers: Collection<string, Event>;

  public Event(): Promise<void>;
  public Command(): Promise<void>;
  public Setup(): Promise<void>;
};

interface LoaderEvents {
  eventLoaded: (event: Event) => unknown;
  eventsReady: () => unknown;

  handlerLoaded: (handler: Event) => unknown;
  handlersReady: () => unknown;

  commandLoaded: (command: Command) => unknown;
  commandsReady: () => unknown;

  ready: () => unknown;
}