import { config } from "dotenv";
let once = false;
if (!once) {
  let data = config({ path: `${process.cwd()}/.env`, override: true });
  if (!data.error) once = true;
};

export default {
  Bot: {
    token: process.env["TOKEN"],
    webhook: process.env["WEBHOOK_URL"],
    developers: ["744835491643260988"]
  },

  Server: {
    enabled: false,
    port: 3000
  }
};