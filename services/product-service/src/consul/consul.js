import Consul from "consul";

const consul = new Consul({
  host: process.env.CONSUL_HOST || "localhost",
  port: process.env.CONSUL_PORT || 8500,
  promisify: true,
});

const SERVICE_NAME = "product-service";
const SERVICE_ID = `${SERVICE_NAME}`;

export async function registerService() {
  await consul.agent.service.register({
    id: SERVICE_ID,
    name: SERVICE_NAME,
    address: process.env.SERVICE_HOST || "localhost",
    port: 3002,
    check: {
      http: `http://${process.env.SERVICE_HOST || "localhost"}:3002/health/get-health`,
      interval: "15s",
      timeout: "5s",
    },
  });

  console.log(`Registered ${SERVICE_NAME} in Consul`);
}

export async function deregisterService() {
  await consul.agent.service.deregister(SERVICE_ID);
  console.log(`Deregistered ${SERVICE_NAME}`);
}
