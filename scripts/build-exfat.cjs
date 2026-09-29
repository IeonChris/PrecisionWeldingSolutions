// Runs `next build` with the exFAT readlink shim preloaded. See scripts/exfat-fs-fix.cjs.
// NODE_OPTIONS (rather than a bare --require) carries the shim into Next's build workers too.
const { spawnSync } = require("child_process");
const path = require("path");

// Forward slashes: NODE_OPTIONS treats backslashes inside quotes as escapes on Windows.
const shim = path.join(__dirname, "exfat-fs-fix.cjs").replace(/\\/g, "/");
const nextBin = require.resolve("next/dist/bin/next");
const nodeOptions = [process.env.NODE_OPTIONS, `--require "${shim}"`].filter(Boolean).join(" ");

const r = spawnSync(process.execPath, [nextBin, "build"], {
  stdio: "inherit",
  env: { ...process.env, NODE_OPTIONS: nodeOptions },
});
process.exit(r.status ?? 1);
