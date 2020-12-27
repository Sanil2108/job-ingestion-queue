const parse = require("csv-parse");
const mysql = require("mysql");

let connection = null;

function setupDatabaseConnection() {
  connection = mysql.createConnection({
    debug: true,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  connection.connect();
}

async function promisifyQuery(sqlQuery, variables) {
  if (!connection) {
    console.error("Connection to database is not defined.");
    return;
  }

  try {
    return await new Promise((resolve, reject) => {
      connection.query(sqlQuery, variables, (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          results,
          fields,
        });
      });
    });
  } catch (exception) {
    console.error(exception);
  }
}

async function insertDataItemToDatabase({ uid, platform, fileId }) {
  const query = "INSERT INTO data_item (uid, platform, file_id) VALUES (?, ?, ?);";
  const variables = [uid, platform, fileId];

  await promisifyQuery(query, variables);
}

async function setFileNumberOfRecords({ fileId, numberOfRecords }) {
  const query = "UPDATE file_data SET total_records = ? WHERE id = ?;";
  const variables = [numberOfRecords, fileId];

  await promisifyQuery(query, variables);
}

async function setFileUploadComplete({ fileId }) {
  const query = "UPDATE file_data SET upload_complete = true WHERE id = ?;";
  const variables = [fileId];

  await promisifyQuery(query, variables);
}

async function insertDataArrayToDatabase({ dataArray, fileId }) {
  for (let i = 0; i < dataArray.length; i += 1) {
    await insertDataItemToDatabase({ uid: dataArray[i][0], platform: dataArray[i][1], fileId });
  }
}

async function parseAndInsertFile(fileDataObj) {
  const { fileId, fileContents } = fileDataObj;

  const csvString = fileContents;
  
  const dataArray = await new Promise((resolve, reject) => {
    parse(csvString, {}, (error, records) => {
      if (error) {
        reject(error);
        return;
      }
      records.splice(0, 1);
      resolve(records);
    });
  });

  await setFileNumberOfRecords({
    fileId,
    numberOfRecords: dataArray.length
  })

  await insertDataArrayToDatabase({
    dataArray,
    fileId
  });

  await setFileUploadComplete({
    fileId
  })
}

module.exports = {
  parseAndInsertFile,
  setupDatabaseConnection,
};
