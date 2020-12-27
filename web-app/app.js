(
  async () => {
    const fileUpload = require('express-fileupload');
    require('dotenv').config();

    console.log('Waiting for services to start up...');
    await new Promise(r => setTimeout(r, 30 * 1000));
    
    const { init: initQueue } = require('./utils/queueHandler');
    initQueue();

    const {init: initDatabase} = require('./utils/dataDriver');
    initDatabase();

    const app = require('express')();
    
    app.use(require('cors')())

    app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));

    const fileRouter = require('./routes/files/fileRouter');

    app.use('/files', fileRouter);

    app.listen(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}`));

    app.use(require('./utils/errorHandler'));
  }
)();
