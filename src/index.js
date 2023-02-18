const ScriptActions = require("./utils/rename/scriptActions.js");

const initRename = new ScriptActions();

module.exports = {
  _rename: () => initRename.initProject(),
};
