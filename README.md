### ABC-ops-comply master

*** Error ***
{"level":"ERROR","timestamp":"2024-03-13T05:48:47.506Z","logger":"kafkajs","message":"[Connection] Connection timeout","broker":"192.168.30.29:9092","clientId":"demo"}
{"level":"ERROR","timestamp":"2024-03-13T05:48:47.512Z","logger":"kafkajs","message":"[BrokerPool] Failed to connect to seed broker, trying another broker from the list: Connection timeout","retryCount":0,"retryTime":341}
{"level":"ERROR","timestamp":"2024-03-13T05:48:47.515Z","logger":"kafkajs","message":"[Connection] Connection error: read ECONNRESET","broker":"192.168.30.29:9092","clientId":"demo","stack":"Error: read ECONNRESET\n    at TLSWrap.onStreamRead (node:internal/stream_base_commons:217:20)\n    at TLSWrap.callbackTrampoline (node:internal/async_hooks:130:17)"}
 ✓ Compiled /api/v2/getRealms in 2.2s (938 modules)
{"level":"ERROR","timestamp":"2024-03-13T05:48:48.334Z","logger":"kafkajs","message":"[Connection] Connection error: Client network socket disconnected before secure TLS connection was established","broker":"192.168.30.29:9092","clientId":"demo","stack":"Error: Client network socket disconnected before secure TLS connection was established\n    at connResetException (node:internal/errors:720:14)\n    at TLSSocket.onConnectEnd (node:_tls_wrap:1605:19)\n    at TLSSocket.emit (node:events:526:35)\n    at endReadableNT (node:internal/streams/readable:1359:12)\n    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)"}
{"level":"ERROR","timestamp":"2024-03-13T05:48:48.338Z","logger":"kafkajs","message":"[BrokerPool] Failed to connect to seed broker, trying another broker from the list: Connection error: Client network socket disconnected before secure TLS connection was established","retryCount":1,"retryTime":604}
AxiosError: getaddrinfo ENOTFOUND sso-dev-k8s.adityabirla.com
***Error***
(node:17832) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
(Use `node --trace-warnings ...` to show where the warning was created)
 ✓ Ready in 5.6s
 ○ Compiling / ...
 ✓ Compiled / in 6.6s (1162 modules)
WebSocket server listening on port 3001
my componet
 ✓ Compiled in 1855ms (322 modules)
{"level":"WARN","timestamp":"2024-03-14T06:59:18.599Z","logger":"kafkajs","message":"KafkaJS v2.0.0 switched default partitioner. To retain the same partitioning behavior as in previous versions, create the producer with the option \"createPartitioner: Partitioners.LegacyPartitioner\". See the migration guide at https://kafka.js.org/docs/migration-guide-v2.0.0#producer-new-default-partitioner for details. Silence this warning by setting the environment variable \"KAFKAJS_NO_PARTITIONER_WARNING=1\""}
{"level":"ERROR","timestamp":"2024-03-14T06:59:18.971Z","logger":"kafkajs","message":"[Connection] Response SaslHandshake(key: 17, version: 1)","broker":"192.168.30.29:9092","clientId":"098673","error":"Request is not valid given the current SASL state","correlationId":1,"size":10}
{"level":"ERROR","timestamp":"2024-03-14T06:59:18.974Z","logger":"kafkajs","message":"[BrokerPool] Failed to connect to seed broker, trying another broker from the list: Request is not valid given the current SASL state","retryCount":0,"retryTime":333}
Error connecting the producer:  KafkaJSProtocolError: Request is not valid given the current SASL state
    at createErrorFromCode (webpack-internal:///(rsc)/./node_modules/kafkajs/src/protocol/error.js:581:10)
    at Object.parse (webpack-internal:///(rsc)/./node_modules/kafkajs/src/protocol/requests/saslHandshake/v0/response.js:24:11)
    at Connection.send (webpack-internal:///(rsc)/./node_modules/kafkajs/src/network/connection.js:433:35)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async SASLAuthenticator.authenticate (webpack-internal:///(rsc)/./node_modules/kafkajs/src/broker/saslAuthenticator/index.js:35:23)
    at async eval (webpack-internal:///(rsc)/./node_modules/kafkajs/src/network/connection.js:139:9)
    at async Connection.authenticate (webpack-internal:///(rsc)/./node_modules/kafkajs/src/network/connection.js:315:5)
    at async Broker.connect (webpack-internal:///(rsc)/./node_modules/kafkajs/src/broker/index.js:111:7)
    at async eval (webpack-internal:///(rsc)/./node_modules/kafkajs/src/cluster/brokerPool.js:93:9)
    at async eval (webpack-internal:///(rsc)/./node_modules/kafkajs/src/cluster/index.js:107:14)
    at async Cluster.connect (webpack-internal:///(rsc)/./node_modules/kafkajs/src/cluster/index.js:146:5)
    at async Object.connect (webpack-internal:///(rsc)/./node_modules/kafkajs/src/producer/index.js:219:7)
    at async ProducerFactory.start (webpack-internal:///(rsc)/./kafka/ProducerFactory.ts:16:13)
    at async $$ACTION_0 (webpack-internal:///(rsc)/./src/component/MessageSenderPage.tsx:27:13)
    at async C:\Users\HP\VSworkspace\nextjs\31_01_2024_abg_feature_dev\cpm\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:38:7068
    at async t2 (C:\Users\HP\VSworkspace\nextjs\31_01_2024_abg_feature_dev\cpm\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:38:6412)
    at async rS (C:\Users\HP\VSworkspace\nextjs\31_01_2024_abg_feature_dev\cpm\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:41:1369)
    at async doRender (C:\Users\HP\VSworkspace\next