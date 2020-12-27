const parse = require("csv-parse");
const mysql = require("mysql");

let connection = null;

function init() {
  connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  connection.connect();
}

async function promisifyQuery(sqlQuery, variables = []) {
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

async function getLastInsertedFile() {
  const query = "SELECT * FROM file_data WHERE id = LAST_INSERT_ID();";

  return await promisifyQuery(query);
}

async function insertFile({ fileName }) {
  const query =
    "INSERT INTO file_data (file_name, upload_complete, total_records) VALUES (?, false, NULL);";
  const variables = [fileName];

  return await promisifyQuery(query, variables);
}

async function getListOfFiles() {
  const query =
    "SELECT * FROM file_data INNER JOIN (SELECT COUNT(*), di.file_id FROM data_item di GROUP BY di.file_id) di on file_data.id = di.file_id;";

  return await promisifyQuery(query);
}

async function getFileData({ fileId }) {
  const query =
    "SELECT *, (SELECT COUNT(*) FROM data_item where file_id = ?) AS count from file_data where id = ?;";
  const variables = [fileId, fileId];

  return await promisifyQuery(query, variables);
}

async function getAllRecordsOfFile({ fileId }) {
  const query = "SELECT * from data_item where file_id = ?;";
  const variables = [fileId];

  return await promisifyQuery(query, variables);
}

module.exports = {
  getListOfFiles,
  getFileData,
  getAllRecordsOfFile,
  insertFile,
  getLastInsertedFile,
  init,
};
