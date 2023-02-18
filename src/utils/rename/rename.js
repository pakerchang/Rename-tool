const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const fsPromise = fs.promises;

class RenameCore {
  constructor() {
    this.fileTypes = [".jpg", ".jpeg", ".png", ".svg"];
    this.directoryPath = path.join(process.cwd());
    this.getFiles = fs
      .readdirSync(directoryPath)
      .filter((item) => fileTypes.includes(path.extname(item)));
    this.prefixName = "";
    this.newFolder = false;
  }

  rename_action(prefixName, isNewFolder) {
    if (prefixName) {
      this.prefixName = prefixName;
    }
    if (isNewFolder) {
      this.newFolder = newFolder;
      this.checkFolder();
    }

    this.getFiles.forEach((file, idx) => {
      const result = this.checkFile(file);
      if (result.isExists) {
        this.copy_renameFile(file, idx, result);
      }
    });
  }

  checkFile(file) {
    return {
      isExists: this.fileTypes.includes(path.extname(file)),
      isNewFolder: isNewFolder,
      filePath: this.directoryPath,
      prefixName: this.prefixName,
      extension: path.extname(file),
    };
  }

  checkFolder() {
    const dir = `${process.cwd()}/NewFolder`;
    const checkResult = fs.existsSync(dir);
    if (!checkResult) fs.mkdirSync(dir);
  }

  copy_renameFile(file, idx, fileInfo) {
    const oldDirectoryPath = fileInfo.filePath + "/" + file;
    const newDirectoryPath = fileInfo.filePath + "/NewFolder/";
    if (this.newFolder) {
      fsPromise.copyFile(oldDirectoryPath, newDirectoryPath + file).then(
        () =>
          fs.rename(
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
