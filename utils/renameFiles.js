import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { createSpinner } from "nanospinner";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileTypes = [".jpg", ".jpeg", ".png", ".svg"];
const getFiles = fs.readdirSync(path.join(__dirname));
const directoryPath = path.join(__dirname);

function renameFiles(prefixName) {
  const _folder = new Promise(() => checkFolder());

  const checkFile = (file) => ({
    isExist: fileTypes.includes(path.extname(file)),
    filePath: directoryPath,
    prefixName: prefixName,
    extension: path.extname(file),
  });

  _folder.then(() =>
    getFiles.forEach((file, idx) => {
      const result = checkFile(file);
      if (result.isExist) {
        copy_renameFile(file, idx, result);
      }
    })
  );
}

function checkFolder() {
  const dir = "./NewFolder";

  fs.access(
    dir,
    (err) =>
      err &&
      fs.chmod(
        dir,
        777,
        (err) => !err && fs.mkdir(dir, (err) => err & console.log(err))
      )
  );
}

function copy_renameFile(file, idx, fileInfo) {
  const newDirectoryPath = fileInfo.filePath + "/NewFolder";
  fs.copyFile(fileInfo.filePath + file, newDirectoryPath);
  fs.rename(
    newDirectoryPath + file,
    fileInfo.prefixName + idx + fileInfo.extension
  );
}

export { renameFiles };
