(
  async () => {
    const fileUpload = require('express-fileupload');
    require('dotenv').config();

    // console.log('Waiting for RabbitMQ service to start up...');
    // await new Promise(r => setTimeout(r, 10 * 1000));
    
    // const { initQueue } = require('./utils/queueHandler');
    // initQueue();

    const {init: initDatabase} = require('./utils/dataDriver');
    initDatabase();

    const app = require('express')();

    app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));

    const fileRouter = require('./routes/files/fileRouter');
    const jobRouter = require('./routes/jobs/jobRouter');

    app.use('/files', fileRouter);
    app.use('/jobs', jobRouter);

    app.listen(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}`));
  }
)();
