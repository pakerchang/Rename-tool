import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function executeScript() {
  const fileTypes = [".jpg", ".jpeg", ".png", ".svg"];
  const getFiles = fs.readdirSync(path.join(__dirname));
  const directoryPath = path.join(__dirname);

  const checkFile = (file) => ({
    isExist: fileTypes.includes(path.extname(file)),
    fileExtension: path.extname(file),
  });

  getFiles.forEach((file, idx) => {
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
