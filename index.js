import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { renameFiles } from "./utils/renameFiles.js";

const timeSnap = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const userRequests = {
  isPrefix: false,
  isOpenNewFolder: false,
  isPending: false,
  filePrefix: "",
};

async function initProject() {
  await askPrefix();
  if (userRequests.isPrefix) {
    await getPrefix();
    await confirmPrefix();
  }
  if (userRequests.isPending) {
    await handleSpinner(userRequests.isPending);
    await renameFiles(userRequests.filePrefix);
  }
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
    .then((rep) =>
      rep.ask_prefix
        ? (userRequests.isPrefix = rep.ask_prefix)
        : (userRequests.isPending = true)
    );
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
    .then((rep) => (userRequests.filePrefix = rep.file_prefix));
}

async function confirmPrefix() {
  await inquirer
    .prompt({
      name: "confirm_prefix",
      type: "confirm",
      message: `請確認設定的檔案前墜：\n`,
      suffix: `Example: ${chalk.greenBright(userRequests.filePrefix + ".png")}`,
      default: userRequests.isPrefix,
    })
    .then((rep) => {
      if (!rep.confirm_prefix) {
        userRequests.isPrefix = rep.confirm_prefix;
        return initProject();
      } else {
        console.log("Ready to rename files");
        userRequests.isPending = true;
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

initProject();
