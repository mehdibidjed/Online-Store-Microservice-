// client of service registy consul 
import Consul from "consul";
const consul = new Consul({
  host: process.env.CONSUL_HOST || "localhost",
  port: process.env.CONSUL_PORT || 8500,
  promisify: true
});

async function getServiceAddress(serviceName) {
  try {
    const nodes = await consul.catalog.service.nodes(serviceName);
    if (!nodes || nodes.length === 0) throw new Error(`Service "${serviceName}" not found`);
    const service = nodes[0];
    console.log(`Discovered service "${serviceName}" at ${service.Address}:${service.ServicePort}`);
    return `http://${service.Address}:${service.ServicePort}`;
  } catch (err) {
    console.error("Error fetching service address:", err.message);
    throw err;
  }
}

export default getServiceAddress;
