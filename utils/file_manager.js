const fs = require('fs-extra');
const BASE_DIRECTORY = 'data';
const csv = require('csvtojson');

const writeToFile = async (fileName, fileContents) => {
  try {
    await fs.outputFile(`${BASE_DIRECTORY}/${fileName}`, fileContents);
  } catch (err) {
    console.error(err);
  }
};

const fileExists = async fileName => {
  try {
    return await fs.pathExists(`${BASE_DIRECTORY}/${fileName}`);
  } catch (err) {
    console.error(err);
  }
};

const readJsonFile = async fileName => {
  try {
    return await fs.readJson(`${BASE_DIRECTORY}/${fileName}`);
  } catch (err) {
    console.error(err);
  }
};

const csvToJson = async fileName => {
  try {
    return await csv().fromFile(`${BASE_DIRECTORY}/${fileName}`);
  } catch (err) {
    console.error(err);
  }
};

const getSavedFiles = async () => {
  try {
    return await fs.readdirSync(`${BASE_DIRECTORY}/saves`).filter(file => file.includes('season-'));
  } catch (err) {
    console.error(err);
  }
}

const readSaveFile = async (fileName) => {
  return await readJsonFile(`saves/${fileName}`);
}

module.exports = { writeToFile, fileExists, readJsonFile, csvToJson, getSavedFiles, readSaveFile };
