require("dotenv").config();

const driver = require('./data/driver');

function onReceiveMessage (message) {
  const messageObj = JSON.parse(message.content.toString());
  driver[messageObj.type](messageObj.payload);
}

async function init () {
  console.log('Waiting for RabbitMQ service to start up...');
  await new Promise(r => setTimeout(r, 10 * 1000));

  console.log(
    `Attempting to open a connection to RabbitMQ service running at ${process.env.RABBIT_MQ_URL}`
  );
  
  let channel;
  try {
    const open = await require("amqplib").connect(process.env.RABBIT_MQ_URL);
    channel = await open.createChannel();
    await channel.assertQueue(process.env.QUEUE_NAME);
    channel.consume(process.env.QUEUE_NAME, (message) => {
      channel.ack(message);
      onReceiveMessage(message)
    });
  }
  catch (exception) {
    console.error(exception);
    if (channel) {
      channel.close();
    }
    return 1;
  }
}

init();
