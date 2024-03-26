// kafkaUtils.ts


import ConsumerFactory from "../../kafka/ConsumerFactory";
import ProducerFactory from "../../kafka/ProducerFactory";
import { Server } from 'socket.io';


export class KafkaUtils {
    private static producerInstances: { [topic: string]: ProducerFactory } = {};
    private static consumerInstances: { [topic: string]: ConsumerFactory } = {};
 
    public static getProducerInstance(topic: string): ProducerFactory {
      if (!this.producerInstances[topic]) {
        this.producerInstances[topic] = new ProducerFactory(topic);
      }
      return this.producerInstances[topic];
    }
 
    public static getConsumerInstance(topic: string, io: Server): ConsumerFactory {
      if (!this.consumerInstances[topic]) {
        this.consumerInstances[topic] = new ConsumerFactory(topic, io);
      }
      return this.consumerInstances[topic];
    }
  }