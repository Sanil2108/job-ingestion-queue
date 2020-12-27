require('dotenv').config();
const app = require('express')();

const fileRouter = require('./routes/files/fileRouter');
const jobRouter = require('./routes/jobs/jobRouter');

app.use('/files', fileRouter);
app.use('/jobs', jobRouter);

app.listen(process.env.PORT, () => console.log(`Listening on PORT ${process.env.PORT}`));
