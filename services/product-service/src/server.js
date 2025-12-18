import app from "./app.js";
import { registerService, deregisterService } from "./consul/consul.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3002;

async function start() {
  await registerService();

  app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
  });
}

start();

process.on("SIGINT", async () => {
  await deregisterService();
  process.exit();
});
