import amqp from "amqplib";

let channel;

export async function connectRabbit() {
  if (channel) return channel;

  const connection = await amqp.connect("amqp://rabbitmq");
  channel = await connection.createChannel();

  await channel.assertExchange("store.events", "topic", {
    durable: true,
  });

  return channel;
}
