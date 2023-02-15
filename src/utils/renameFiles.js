import fs from "fs";
import path from "path";

const fsPromise = fs.promises;
const fileTypes = [".jpg", ".jpeg", ".png", ".svg"];
const directoryPath = path.join(process.cwd());
const getFiles = fs.readdirSync(directoryPath);

function renameFiles(prefixName, isNewFolder) {
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
  // Need props to fixed path
  const dir = "./assets/NewFolder";

  fsPromise.access(dir).then(fs.mkdir(dir, (err) => err & console.log(err)));
}

function copy_renameFile(file, idx, fileInfo) {
  const newDirectoryPath = fileInfo.filePath + "/NewFolder";
  if (fileInfo.isNewFolder) {
    // fsPromise
    //   .copyFile(fileInfo.filePath + "/" + file, newDirectoryPath)
    //   .then(() =>
    //     fs.renameSync(
    //       newDirectoryPath + "/" + file,
    //       newDirectoryPath + "/" + fileInfo.prefixName + idx + fileInfo.extension
    //     )
    //   );
  } else {
    fs.renameSync(
      fileInfo.filePath + "/" + file,
      fileInfo.filePath + "/" + fileInfo.prefixName + idx + fileInfo.extension
    );
  }
}

export { renameFiles, checkFolder };
