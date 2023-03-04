const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const fsPromise = fs.promises;

class RenameCore {
  constructor(directoryPath) {
    this.fileTypes = [];
    this.directoryPath = directoryPath;
    this.getFiles = [];
    this.prefixName = "";
    this.newFolder = false;
  }

  rename_action(prefixName, isNewFolder) {
    if (prefixName) {
      this.prefixName = prefixName;
    }
    if (isNewFolder) {
      this.newFolder = "NewFolder";
      this.checkFolder();
    }

    this.getFiles.forEach((file, idx) => {
      const result = this.checkFile(file);
      if (result.isExists) {
        this.copy_renameFile(file, idx, result);
      } else {
        console.log("No Files");
      }
    });
  }

  updateTypes(types) {
    return (this.fileTypes = types.map((item) => "." + item));
  }

  checkFile(file) {
    return {
      isExists: this.fileTypes.includes(path.extname(file)),
      filePath: this.directoryPath,
      prefixName: this.prefixName,
      extension: path.extname(file),
    };
  }

  checkFolder() {
    const dir = `${this.directoryPath}/NewFolder`;
    const checkResult = fs.existsSync(dir);
    if (!checkResult) fs.mkdirSync(dir);
  }

  copy_renameFile(file, idx, fileInfo) {
    const oldDirectoryPath = fileInfo.filePath + "/" + file;
    const newDirectoryPath = fileInfo.filePath + "/NewFolder/";
    if (this.newFolder) {
      fsPromise.copyFile(oldDirectoryPath, newDirectoryPath + file).then(
        () =>
          fs.renameSync(
            newDirectoryPath + file,
            newDirectoryPath + fileInfo.prefixName + idx + fileInfo.extension
          ),
        (err) => {
          if (err) throw err;
          console.log(
            chalk.blueBright("Convert:"),
            chalk.greenBright(file + " -> " + fileInfo.prefixName + idx + fileInfo.extension)
          );
        }
      );
    } else {
      fs.rename(
        oldDirectoryPath,
        fileInfo.filePath + "/" + fileInfo.prefixName + idx + fileInfo.extension,
        (err) => {
          if (err) throw err;
          console.log(
            chalk.blueBright("Convert:"),
            chalk.greenBright(file + " -> " + fileInfo.prefixName + idx + fileInfo.extension)
          );
        }
      );
    }
  }
}

module.exports = RenameCore;
