const { spawnSync } = require("child_process");
const { resolve } = require("path");

const cmd = "node --no-warnings " + resolve(__dirname, "app.js");
spawnSync(cmd, { stdio: "inherit", shell: true });