const { sendMessageToQueue } = require("../../utils/queueHandler");
const dataDriver = require('../../utils/dataDriver');

const router = require("express").Router();

// Upload file
router.post("/", async (req, res) => {
  const file = req.files[Object.keys(req.files)[0]];

  // Add entry to database that the file has been added and is pending upload
  await dataDriver.insertFile({fileName: file.name});
  const savedFileData = await dataDriver.getLastInsertedFile();
  
  // Get back the id from rabbitmq and send it to the user
  sendMessageToQueue({
    type: 'parseAndInsertFile',
    payload: {
      fileId: savedFileData.results[0].id,
      fileContents: file.data
    }
  });

  res.status(200).send();
});

router.get("/", async (req, res) => {
  const fileData = await dataDriver.getListOfFiles();

  res.send(JSON.stringify(fileData.results));
});

router.get("/:fileId", async (req, res) => {
  const fileData = await dataDriver.getFileData({fileId: req.params.fileId});

  res.send(JSON.stringify(fileData.results[0]));
});

module.exports = router;
