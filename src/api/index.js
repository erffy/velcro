import express from "express";
import cors from "cors";

import sync from "../lib/utils/Sync.js";
import config from "../bot.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function initializeRouters(callback) {
  const routers = sync("/**/api/routers/*/*.js");

  for (const router of routers) {
    /**
     * @type import("./routers/Router").default
     */
    const route = (new ((await import(router)).default)());

    app.use(`/${route.name}`, route.execute);
  };

  callback(routers.length);

  return void 0;
};

if (config.Server.enabled) initializeRouters((size) => {
  if (size < 1) console.log('[Server] No routers found. Skipping');
  else console.log('[Server] Routers ready.');

  console.log('[Server] Starting server');
  app.listen(config.Server.port, () => console.log('[Server] Server started.'));
});