const parse = require("csv-parse");
const mysql = require("mysql");

let connection = null;

function setupDatabaseConnection() {
  connection = mysql.createConnection({
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

  const {results, fields} = promisifyQuery(query, variables);
}

async function insertFile({ fileName }) {
  const query = "INSERT INTO file_data (file_name) VALUES (?);";
  const variables = [fileName];

  const {results, fields} = promisifyQuery(query, variables);
}

async function insertDataArrayToDatabase({ dataArray, fileName }) {
  for (let i = 0; i < dataArray.length; i += 1) {
    await insertDataItemToDatabase({ ...dataArray[i], fileName });
  }
}

async function parseAndInsertFile(fileDataObj) {
  const { fileName, fileContents } = fileDataObj;

  await insertFile({ fileName });

  const csvString = fileContents.toString();

  const dataArray = await new Promise((resolve, reject) => {
    parse(csvString, {}, (error, records) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(records);
    });
  });

  await insertDataArrayToDatabase({
    dataArray,
    fileName
  });

  // console.log(records);
}

module.exports = {
  parseAndInsertFile,
  setupDatabaseConnection,
};
