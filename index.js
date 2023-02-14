import fs from "fs";
import path from "path";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

const timeSnap = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
function executeScript() {
  const fileTypes = [".jpg", ".jpeg", ".png", ".svg"];
  const getFiles = fs.readdirSync(path.join(__dirname));
  const directoryPath = path.jon(__dirname);
  const testFiles = fs.readdirSync(testAssets);

  const checkFile = (file) => ({
    isExist: fileTypes.includes(path.extname(file)),
    fileExtension: path.extname(file),
  });

  testFiles.forEach((file, idx) => {
    const oldPath = `${testAssets}/${file}`;

    const result = checkFile(file);
    if (result.isExist) {
      fs.rename(
        directoryPath + file,
        directoryPath + `${idx + result.fileExtension}`,
        (err) => err && console.log(err)
      );
    } else {
    }
  });
}

executeScript();

async function initProject() {
  const title = chalk.bgGreen("Initial tool....\n");

  await timeSnap();

  title.stop();
}
export { executeScript };
