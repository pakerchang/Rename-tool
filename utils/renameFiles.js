import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { createSpinner } from "nanospinner";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const timeSnap = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

function renameFiles(prefixName) {
  handleSpinner(true);
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
        directoryPath + `${prefixName + idx + result.fileExtension}`,
        (err) => err && console.log(err)
      );
    } else {
    }
  });
}
async function handleSpinner(isPending) {
  const spinner = createSpinner("Renaming...").start();
  await timeSnap();
  if (isPending) {
    return spinner.success({ text: "Rename is done." });
  }
  if (!isPending) {
    spinner.error({ text: "Something is wrong." });
    return process.exit(1);
  }
}
export default renameFiles;
