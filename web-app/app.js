(
  async () => {
    console.log('Waiting for RabbitMQ service to start up...');
    await new Promise(r => setTimeout(r, 10 * 1000));
    
    require('dotenv').config();

    const { init } = require('./utils/queueHandler');
    init();

    const app = require('express')();

    const fileRouter = require('./routes/files/fileRouter');
    const jobRouter = require('./routes/jobs/jobRouter');

    app.use('/files', fileRouter);
    app.use('/jobs', jobRouter);

    app.listen(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}`));
  }
)();
