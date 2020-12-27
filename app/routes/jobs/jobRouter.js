const router = require('express').Router();

// TODO: Decide if this is required
router.get('/', (req, res) => {
  res.send('Hello from list jobs API');
});

router.get('/:job', (req, res) => {
  res.send('Hello from job detail API')
})

module.exports = router;
