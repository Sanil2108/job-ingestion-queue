require("dotenv").config();

const dataDriver = require('./drivers/dataDriver');
const rabbitMqDriver = require('./drivers/rabbitmqDriver');

async function init () {
  console.log('Waiting for services to start up...');
  await new Promise(r => setTimeout(r, 10 * 1000));

  // await rabbitMqDriver.setupConnection();
  await dataDriver.setupDatabaseConnection();
}

init();
