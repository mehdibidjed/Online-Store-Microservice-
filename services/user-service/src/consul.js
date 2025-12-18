import Consul from "consul";

const consul = new Consul({
  host: process.env.CONSUL_HOST || "localhost",
  port: process.env.CONSUL_PORT || 8500,
  promisify: true,
});

export function registerUserService() {
  consul.agent.service.register(
    {
      name: "user-service",
      address: "localhost",
      port: 3001,
      check: {
        http: "http://localhost:3001/health/get-health",
        interval: "10s",
      },
    },
    (err) => {
      if (err) {
        console.error("Consul registration failed", err);
      } else {
        console.log("User Service registered in Consul");
      }
    }
  );
}
