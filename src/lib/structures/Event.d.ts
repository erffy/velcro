import { ClientEvents, RestEvents, WebSocketShardEventTypes } from "discord.js";

import Base from "./Base";
import Client from "../Client/Client";

export default abstract class Event extends Base {
  public constructor(client: Client, options: EventOptions);

  public readonly options: EventOptions;
  
  public execute(): Promise<void>;
  public onLoad(): void;
  public onError(): void;
};

/**
 * Event Options.
 */
export interface EventOptions {
  /**
   * Name of the event.
   * @default undefined
   */
  name: keyof Events;

  /**
   * Description of the event.
   * @default undefined
   */
  description: string;

  /**
   * Specify whether the event will be enabled or disabled.
   * @default true
   */
  enabled?: boolean;

  /**
   * Determine if the event is under development.
   * @default false
   */
  development?: boolean;

  /**
   * Specify whether to run the event once.
   * @default false
   */
  once?: boolean;
  
  /**
   * Specify the type of the event.
   * @default "CLIENT"
   */
  type?: EventTypes;
};

/**
 * Event Types.
 */
export type EventTypes = "REST_CLIENT" | "WEBSOCKET_CLIENT" | "CLIENT" | "PROCESS";

/**
 * All Events.
 */
export interface Events extends ClientEvents, RestEvents, WebSocketShardEventTypes {
  unhandledRejection: "unhandledRejection";
  uncaughtException: "uncaughtException";
};