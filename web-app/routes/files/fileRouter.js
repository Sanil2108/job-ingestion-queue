const {sendMessageToQueue} = require('../../utils/queueHandler');

const router = require('express').Router();

// Upload file
router.post('/', (req, res) => {
  res.send('Hello from submit files API');
  sendMessageToQueue({
    type: 'uploadFile',
    payload: 'Hello'
  });
});

router.get('/', (req, res) => {
  res.send('Hello from list files API');
});

router.get('/:fileId', (req, res) => {
  res.send('Hello from file detail API')
})

module.exports = router;
