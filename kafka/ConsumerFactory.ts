import {
  Consumer,
  ConsumerSubscribeTopics,
  Kafka,
  EachMessagePayload,
} from "kafkajs";
import { Server } from "socket.io";

export default class ConsumerFactory {
  private kafkaConsumer: Consumer;
  private io: Server;
  private topic: string;

  constructor(topic: string, io: Server) {
    this.topic = topic;
    this.kafkaConsumer = this.createKafkaConsumer();
    this.io = io;
  }
  private messageQueue: string[] = []; // Queue to hold messages

  public async startConsumer(): Promise<void> {
    console.log("came to 24 startConsume()");

    const topic: ConsumerSubscribeTopics = {
      topics: [this.topic],
      fromBeginning: true,
    };
    console.log("came to 30 after ConsumerSubscribeTopics");

    try {
      await this.kafkaConsumer.connect();
      console.log("34 kafkaConsumer.connect()");

      await this.kafkaConsumer.subscribe(topic);
      console.log("37 kafkaConsumer.subscribe(topic)");

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          console.log("41 inside kafkaConsumer.run");
          const { message } = messagePayload;
          if (message && message.value !== null) {
            const messageValue = message.value.toString();
            console.log("Received message:", messageValue);
            // Add message to queue
            this.messageQueue.push(messageValue);
            // Emit messages if WebSocket server is available
            this.emitMessages();
          }
        },
      });
    } catch (error) {
      console.error("Error starting Kafka consumer:", error);
      throw error;
    }
  }

  private createKafkaConsumer(): Consumer {
    const kafka = new Kafka({
      clientId: "demo",
      brokers: ["localhost:9092"],
    });
    return kafka.consumer({ groupId: "test-consumer-group" });
  }
  private emitMessages() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message && this.io) {
        this.io.to(this.topic).emit(`kafka-message-${this.topic}`, message);
      }
    }
  }
}
// import {
//   Consumer,
//   ConsumerSubscribeTopics,
//   Kafka,
//   EachMessagePayload,
// } from "kafkajs";
// import { Server } from "socket.io";

// export default class ConsumerFactory {
//   private kafkaConsumer: Consumer;
//   private io: Server;
//   private topic: string;

//   constructor(topic: string, io: Server) {
//     this.topic = topic;
//     this.kafkaConsumer = this.createKafkaConsumer();
//     this.io = io;
//   }
//   private messageQueue: string[] = []; // Queue to hold messages

//   public async startConsumer(): Promise<void> {
//     console.log(`Starting consumer for topic: ${this.topic}`);
    
//     const topic: ConsumerSubscribeTopics = {
//       topics: [this.topic],
//       fromBeginning: true,
//     };

//     try {
//       await this.kafkaConsumer.connect();
//       console.log("Consumer connected");

//       await this.kafkaConsumer.subscribe(topic);
//       console.log("Consumer subscribed to topic");

//       await this.kafkaConsumer.run({
//         eachMessage: async (messagePayload: EachMessagePayload) => {
//           if (messagePayload.message && messagePayload.message.value !== null) {
//             const messageValue = messagePayload.message.value.toString();
//             console.log(`Received message for topic ${this.topic}: ${messageValue}`);
//             // Add message to queue
//             this.messageQueue.push(messageValue);
//             // Emit messages if WebSocket server is available
//             this.emitMessages();
//           }
//         },
//       });
//     } catch (error) {
//       console.error("Error starting Kafka consumer:", error);
//       throw error;
//     }
//   }

//   private createKafkaConsumer(): Consumer {
//     const kafka = new Kafka({
//       clientId: "demo",
//       brokers: ["localhost:9092"],
//     });
//     return kafka.consumer({ groupId: "test-consumer-group" });
//   }

//   private emitMessages() {
//     while (this.messageQueue.length > 0) {
//       const message = this.messageQueue.shift();
//       if (message && this.io) {
//         this.io.to(this.topic).emit(`kafka-message-${this.topic}`, message);
//       }
//     }
//   }
// }
