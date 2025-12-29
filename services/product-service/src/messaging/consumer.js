import { updateStockPoruct } from "../controllers/productController";
import { connectRabbit } from "./rabbit";

export default startConsume= async ()=>{


    try {
        const channel=await connectRabbit();
        const queueName="product-service-queue";
        const exchanegName="store.events";
        await channel.assertQueue(queueName,{durable:true});
        await channel.bindQueue(queueName,exchanegName,"order.created");
        console.log("[*] waiting for 'order.created' events......");
        channel.consume(queueName,(msg)=>{
            if(msg){
                const event=JSON.parse(msg.content.ToString());
            }
            console.log(event);
            const {product_id,quantity}=event;
            if (product_id){

                 updateStockPoruct(product_id,quantity);
            }
            channel.ack(msg)
        })

    } catch (error) {
        console.error("Failed to process message:", err.message);
        channel.nack(msg, false, false); 
    }
}