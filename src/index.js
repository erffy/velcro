import "./bot.config.js";

import spawn from "./lib/utils/Spawn.js";
spawn('./src/api/index.js', { detached: true });

import ShardingManager from "./lib/client/Sharding.js";
(new ShardingManager()).spawn;