const { sendMessageToQueue } = require("../../utils/queueHandler");
const dataDriver = require("../../utils/dataDriver");

const router = require("express").Router();

// Upload file
router.post("/", async (req, res) => {
  const file = req.files[Object.keys(req.files)[0]];

  await dataDriver.insertFile({ fileName: file.name });
  const savedFileData = await dataDriver.getLastInsertedFile();

  sendMessageToQueue({
    type: "parseAndInsertFile",
    payload: {
      fileId: savedFileData.results[0].id,
      fileContents: file.data.toString(),
    },
  });

  res.status(200).send(
    JSON.stringify({
      fileId: savedFileData.results[0].id,
    })
  );
});

router.get("/", async (req, res) => {
  const fileData = await dataDriver.getListOfFiles();

  res.json(fileData.results);
});

router.get("/:fileId", async (req, res) => {
  const fileData = await dataDriver.getFileData({ fileId: req.params.fileId });
  const allRecords = fileData.upload_complete
    ? await dataDriver.getAllRecordsOfFile({ fileId: req.params.fileId })
    : null;

  res.json({ fileData: fileData.results[0], records: allRecords });
});

module.exports = router;
