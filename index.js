import chalk from "chalk";
import inquirer from "inquirer";
import { renameFiles } from "./utils/index.js";

const userRequest = {
  isPrefix: false,
  filePrefix: "",
};
async function initProject() {
  await askPrefix();
  if (userRequest.isPrefix) {
    await getPrefix();
    await confirmPrefix();
  }
  await renameFiles(userRequest.filePrefix);
}

async function askPrefix() {
  await inquirer
    .prompt({
      name: "ask_prefix",
      type: "list",
      message: "需要幫檔名添加前墜嗎？",
      choices: [
        {
          name: "是",
          value: true,
        },
        {
          name: "否",
          value: false,
        },
      ],
      default: false,
    })
    .then((rep) => (userRequest.isPrefix = rep.ask_prefix));
}

async function getPrefix() {
  await inquirer
    .prompt({
      name: "file_prefix",
      type: "input",
      message: `請輸入檔案前墜名稱: \n`,
      suffix: ` 請用 '_' 或 '-' 取代空格 \n`,
      validate(input) {
        if (input.indexOf(" ") >= 0) {
          throw Error(chalk.redBright("檔案名稱內帶有空格，請重新輸入"));
        } else {
          return true;
        }
      },
    })
    .then((rep) => (userRequest.filePrefix = rep.file_prefix));
}

async function confirmPrefix() {
  await inquirer
    .prompt({
      name: "confirm_prefix",
      type: "confirm",
      message: `請確認設定的檔案前墜：\n`,
      suffix: `Example: ${chalk.greenBright(userRequest.filePrefix + ".png")}`,
      default: userRequest.isPrefix,
    })
    .then((rep) => {
      if (!rep.confirm_prefix) {
        userRequest.isPrefix = rep.confirm_prefix;
        return initProject();
      }
      if (rep.confirm_prefix) handleSpinner(true);
    });
}

initProject();
