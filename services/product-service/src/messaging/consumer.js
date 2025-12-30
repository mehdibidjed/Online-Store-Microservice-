import { updateStockProduct } from "../controllers/productController.js";
import { connectRabbit } from "./rabbit.js";

export default async function startConsume() {
  try {
    const channel = await connectRabbit();
    if (!channel) {
      console.log("No channel connection");
      return;
    }

    const queueName = "product-service-queue";
    const exchangeName = "store.events";
    const routingKey = "order.created";

    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, routingKey);

    console.log(`[*] Waiting for '${routingKey}' events...`);

    channel.consume(queueName, async (msg) => {
      if (!msg) return;

      try {
        const event = JSON.parse(msg.content.toString());
        console.log("Received event:", event);

        const { product_id, quantity } = event.data;
        if (product_id && quantity != null) {
            console.log("trying to update stock")
          await updateStockProduct(product_id, quantity);
        }

        channel.ack(msg); // Acknowledge message
      } catch (err) {
        console.error("Error processing message:", err.message);
        channel.nack(msg, false, false); // Reject message without requeue
      }
    });
  } catch (error) {
    console.error("Failed to connect or start consumer:", error.message);
  }
}
