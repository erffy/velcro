import { Client as BaseClient } from "discord.js";
import { ClusterClient } from "discord-hybrid-sharding";

import Loader from "./Loader";

export default class Client<Ready extends boolean = boolean> extends BaseClient {
  public constructor(token?: string);

  public readonly token: string;
  public readonly cluster: ClusterClient<Client<Ready>>;
  public readonly loader: Loader;

  public login(): Promise<void>;
};