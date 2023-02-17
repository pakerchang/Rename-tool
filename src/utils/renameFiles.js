const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const fsPromise = fs.promises;
const fileTypes = [".jpg", ".jpeg", ".png", ".svg"];
const directoryPath = path.join(process.cwd());
const getFiles = fs
  .readdirSync(directoryPath)
  .filter((item) => fileTypes.includes(path.extname(item)));

function renameFiles(prefixName, isNewFolder) {
  if (isNewFolder) checkFolder();
  const checkFile = (file) => ({
    isExist: fileTypes.includes(path.extname(file)),
    isNewFolder: isNewFolder,
    filePath: directoryPath,
    prefixName: prefixName,
    extension: path.extname(file),
  });

  getFiles.forEach((file, idx) => {
    const result = checkFile(file);
    if (result.isExist) {
      copy_renameFile(file, idx, result);
    }
  });
}

function checkFolder() {
  const dir = `${process.cwd()}/NewFolder`;

  const checkResult = fs.existsSync(dir);
  if (!checkResult) fs.mkdirSync(dir);
}

function copy_renameFile(file, idx, fileInfo) {
  const newDirectoryPath = fileInfo.filePath + "/NewFolder";
  if (fileInfo.isNewFolder) {
    fsPromise
      .copyFile(fileInfo.filePath + "/" + file, newDirectoryPath + "/" + file)
      .then(() =>
        fs.rename(
          newDirectoryPath + "/" + file,
          newDirectoryPath +
            "/" +
            fileInfo.prefixName +
            idx +
            fileInfo.extension,
          (err) => {
            if (err) throw err;
            console.log(
              chalk.blueBright("Convert:"),
              chalk.greenBright(
                file + " -> " + fileInfo.prefixName + idx + fileInfo.extension
              )
            );
          }
        )
      );
  } else {
    fs.rename(
      fileInfo.filePath + "/" + file,
      fileInfo.filePath + "/" + fileInfo.prefixName + idx + fileInfo.extension,
      (err) => {
        if (err) throw err;
        console.log(
          chalk.blueBright("Convert:"),
          chalk.greenBright(
            file + " -> " + fileInfo.prefixName + idx + fileInfo.extension
          )
        );
      }
    );
  }
}

module.exports = renameFiles;
