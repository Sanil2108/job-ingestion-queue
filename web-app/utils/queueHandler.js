const amqp = require("amqplib");

let channel;

async function init() {
  try {
    const open = await amqp.connect(process.env.RABBIT_MQ_URL);
    channel = await open.createChannel();
    await channel.assertQueue(process.env.QUEUE_NAME);
  }
  catch (exception) {
    console.error(exception);
  }
}

function sendMessageToQueue (message) {
  if (!channel) {
    console.error('Channel does not exist.');
    return;
  }

  channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(JSON.stringify(message)));
}

module.exports = {
  init,
  sendMessageToQueue,
}