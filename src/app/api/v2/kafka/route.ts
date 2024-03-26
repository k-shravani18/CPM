    import { Kafka } from "kafkajs";
    import { NextRequest, NextResponse } from "next/server";
    const kafkaConsumer = require("kafka-node");

    const kafkaProducer = new Kafka({
    clientId: "test",
    brokers: ["localhost:9092"],
    });
    const client = new kafkaConsumer.KafkaClient({ kafkaHost: "127.0.0.1:9092" });

    const producer = kafkaProducer.producer();
    const consumer = kafkaProducer.consumer({ groupId: "test" });
    export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();

    // Producing
    await producer.connect();
    await producer.send({
        topic: "demo", // topic: 'test',
        messages: [{ value: JSON.stringify(body) }],
    });

    console.log("Message sent");

    return NextResponse.json({
        message: "Message Sent to kafka topic",
        payloads: JSON.stringify(body),
    });
    }
    const topics = ["demo", "create"];
    //var outmsg: any[] = []
    const outmsg: any[] = [];
    const outmsg1: { topic: any; value: any }[] = [];
    
    export async function GET(req: NextRequest, res: NextResponse) {
    const Producer = kafkaConsumer.Producer;
    //const producer = new Producer(client);
    const Consumer = kafkaConsumer.Consumer;
    const consumers = topics.map(
        (topic) =>
        new Consumer(client, [{ topic, partition: 0, fromBeginning: true }], {
            autoCommit: false,
            fromOffset: "earliest",
        })
    );
    /* const consumer = new Consumer(client, [{ topic: "sampleTest", partition: 0, fromBeginning: true }], {
        autoCommit: false,
        fromOffset: "earliest",
    }); */
    //const outmsg1 = [];
    consumers.forEach((consumer) => {
        consumer.on("message", (message: any) => {
        outmsg1.push({ topic: message.topic, value: message.value });
        });

        // Explicitly commit the offset after processing the message
        consumer.commit((err: any, data: any) => {
        if (err) {
            console.error("Error committing offset:", err);
        } else {
            //console.log("Offset committed:", data);
        }
        });
    });
    //console.log("+++++++++++++++++++++++");
    //console.log(outmsg1);
    /* consumer.on("message", (message: any) => {
        outmsg.push(message.value);
    });


    // Explicitly commit the offset after processing the message
    consumer.commit((err: any, data: any) => {
        if (err) {
        console.error("Error committing offset:", err);
        } else {
        //console.log("Offset committed:", data);
        }
    }); */

    return NextResponse.json({
        message: outmsg1,
        status: 200,
    });
    }
