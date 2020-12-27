const router = require('express').Router();

router.post('/', (req, res) => {
  res.send('Hello from submit files API')
});

router.get('/', (req, res) => {
  res.send('Hello from list files API');
});

router.get('/:fileId', (req, res) => {
  res.send('Hello from file detail API')
})

module.exports = router;
