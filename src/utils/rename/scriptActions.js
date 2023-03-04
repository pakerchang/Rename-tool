const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const { createSpinner } = require("nanospinner");
const RenameCore = require("./rename.js");

const timeSnap = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

class ScriptActions {
  constructor() {
    this.isPrefix = false;
    this.isNewFolder = false;
    this.filePrefix = "";
    this.directoryPath = path.join(process.cwd() + "/temp");
    this.typeList = ["jpg", "jpeg", "png", "svg"];
    this.renameCore = new RenameCore(this.directoryPath);
  }

  async initProject() {
    await this.askFileType();
    await this.askPrefix();
    if (this.isPrefix) {
      await this.getPreFix();
      await this.confirmPrefix();
    }
    await this.askNewFolder();
    await this.handleSpinner(true);
    this.renameCore.getFiles = await fs
      .readdirSync(this.directoryPath)
      .filter((item) => this.renameCore.fileTypes.includes(path.extname(item)));

    await this.renameCore.rename_action(this.isPrefix, this.isNewFolder);

    await this.handleSpinner(false);
  }

  async askFileType() {
    await inquirer
      .prompt({
        name: "type_list",
        type: "checkbox",
        message: "請選擇要改變的圖檔類型",
        choices: this.typeList.map((item) => ({ name: item, value: item })),
      })
      .then((rep) => (this.renameCore.fileTypes = rep.type_list.map((item) => "." + item)));
  }

  async askPrefix() {
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
      .then((rep) => {
        if (rep.ask_prefix) this.isPrefix = rep.ask_prefix;
      });
  }
  async getPreFix() {
    await inquirer
      .prompt({
        name: "file_prefix",
        type: "input",
        message: `請輸入檔案前綴名稱: \n`,
        suffix: ` 請用 '_' 或 '-' 代替空格 \n`,
        validate(input) {
          if (input.indexOf(" ") >= 0) {
            throw Error(chalk.redBright("檔案名稱內帶有空格，請重新輸入"));
          } else {
            return true;
          }
        },
      })
      .then((rep) => (this.filePrefix = rep.file_prefix));
  }
  async confirmPrefix() {
    await inquirer
      .prompt({
        name: "confirm_prefix",
        type: "confirm",
        message: `請確認設定的檔案前綴：\n`,
        suffix: `Example: ${chalk.greenBright(this.filePrefix + "0.png")}`,
        default: this.isPrefix,
      })
      .then((rep) => {
        if (!rep.confirm_prefix) {
          this.isPrefix = rep.confirm_prefix;
          return initProject();
        }
      });
  }
  async askNewFolder() {
    await inquirer
      .prompt({
        name: "new_folder",
        type: "confirm",
        message: "需要將更名檔案存到新資料夾嗎？",
        default: false,
      })
      .then((rep) => (this.isNewFolder = rep.new_folder));
  }
  async handleSpinner(isPending) {
    const spinner = createSpinner("更名中... \n").start();
    await timeSnap();
    if (isPending) {
      return spinner.spin({ text: "更名中... \n" });
    }
    if (!isPending) {
      return spinner.success({ text: "完成" }) && process.exit(1);
    }
  }
}

module.exports = ScriptActions;
