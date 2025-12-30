import app from "./app.js";
import { registerService, deregisterService } from "./consul/consul.js";
import dotenv from "dotenv";
import startConsume from './messaging/consumer.js';


dotenv.config();
const PORT = process.env.PORT || 3002;

async function start() {
  await registerService();

  app.listen(PORT, () => {
    
    console.log(`Product Service running on port ${PORT}`);
  });
  await startConsume();
}

start();

process.on("SIGINT", async () => {
  await deregisterService();
  process.exit();
});
