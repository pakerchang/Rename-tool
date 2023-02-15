import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { renameFiles, checkFolder } from "./utils/renameFiles.js";

const timeSnap = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const userRequests = {
  isPrefix: false,
  isOpenNewFolder: false,
  filePrefix: "",
};

async function initProject() {
  await askPrefix();
  if (userRequests.isPrefix) {
    await getPrefix();
    await confirmPrefix();
  }
  await handleSpinner(true);
  await renameFiles(userRequests.filePrefix);
  await handleSpinner(false);
}

async function askPrefix() {
  await inquirer
    .prompt({
      name: "ask_prefix",
      type: "list",
      message: "需要幫檔名添加前綴嗎？",
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
    .then((rep) =>
      rep.ask_prefix ? (userRequests.isPrefix = rep.ask_prefix) : checkFolder()
    );
}

async function getPrefix() {
  await inquirer
    .prompt({
      name: "file_prefix",
      type: "input",
      message: `請輸入檔案前墜名稱: \n`,
      suffix: ` 請用 '_' 或 '-' 代替空格 \n`,
      validate(input) {
        if (input.indexOf(" ") >= 0) {
          throw Error(chalk.redBright("檔案名稱內帶有空格，請重新輸入"));
        } else {
          return true;
        }
      },
    })
    .then((rep) => (userRequests.filePrefix = rep.file_prefix));
}

async function confirmPrefix() {
  await inquirer
    .prompt({
      name: "confirm_prefix",
      type: "confirm",
      message: `請確認設定的檔案前綴：\n`,
      suffix: `Example: ${chalk.greenBright(userRequests.filePrefix + ".png")}`,
      default: userRequests.isPrefix,
    })
    .then((rep) => {
      if (!rep.confirm_prefix) {
        userRequests.isPrefix = rep.confirm_prefix;
        return initProject();
      }
    });
}

async function handleSpinner(isPending) {
  const spinner = createSpinner("更名中...").start();
  await timeSnap();
  if (isPending) {
    return spinner.spin({ text: "更名中..." });
  }
  if (!isPending) {
    return spinner.success({ text: "完成" }) && process.exit(1);
  }
}

initProject();
