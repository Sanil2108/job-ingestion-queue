async function insertDataItemToDatabase(dataItem) {
  const query = '';


}

async function insertDataArrayToDatabase(dataArray) {
  for (let i = 0; i < dataArray.length; i += 1) {
    await insertDataItemToDatabase(dataArray[i]);
  }
}

module.exports = {
  insertDataArrayToDatabase,
}
