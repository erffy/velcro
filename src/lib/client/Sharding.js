import { ClusterManager } from "discord-hybrid-sharding";
import config from "../../bot.config.js";

export class ShardingManager extends ClusterManager {
  constructor() {
    let cwd = process.cwd();

    super(`${cwd}/src/bot.js`, {
      token: config.Bot.token,
      mode: "process",

      totalClusters: "auto",
      totalShards: "auto",
      shardsPerClusters: 4,

      respawn: true,
      restarts: { max: 5 }
    });

    this.on("clusterReady", (cluster) => console.log(`[${this.constructor.name}] Cluster ${cluster.id} ready.`));
    this.on("clusterCreate", (defaultCluster) => {
      console.log(`[${this.constructor.name}] Cluster ${defaultCluster.id} created.`);

      defaultCluster.on("spawn", (thread) => console.log(`[${this.constructor.name}] Cluster ${defaultCluster.id} spawned. (PID: ${thread.pid})`));
      defaultCluster.on("death", (cluster) => console.log(`[${this.constructor.name}] Cluster ${cluster.id} death.`));
      defaultCluster.on("error", (error) => console.log(`[${this.constructor.name}] Cluster ${defaultCluster.id} has error. (${error.message})`));
    });
  };

  get spawn() {
    super.spawn({ timeout: -1 });

    return this;
  };
};

export default ShardingManager;