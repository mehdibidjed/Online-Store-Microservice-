import { connectRabbit } from "./rabbit.js";
import crypto from "crypto";

export async function publishEvent(eventType, payload) {
  const channel = await connectRabbit();

  const event = {
    id: crypto.randomUUID(),
    type: eventType,
    producer: "order-service",
    timestamp: new Date().toISOString(),
    data: payload,
  };

  channel.publish(
    "store.events",
    eventType,
    Buffer.from(JSON.stringify(event)),
    { persistent: true }
  );
}
