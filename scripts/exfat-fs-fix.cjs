/**
 * Preload shim for building on exFAT/FAT volumes (e.g. external drives on Windows).
 *
 * On those filesystems Node's fs.readlink() rejects non-symlink paths (files and directories)
 * with EISDIR instead of EINVAL, which makes webpack's file-system snapshotting and Next's output
 * file tracing abort `next build` with "EISDIR: illegal operation on a directory, readlink ...".
 * This maps that error back to the EINVAL they expect. It is only wired into the `build:exfat`
 * npm script and is not needed on NTFS, macOS, Linux or Vercel.
 */
const fs = require("fs");

function fixErr(err, p) {
  if (err && err.code === "EISDIR") {
    try {
      if (!fs.lstatSync(p).isSymbolicLink()) {
        const e = new Error(`EINVAL: invalid argument, readlink '${p}'`);
        e.code = "EINVAL";
        e.errno = -4071;
        e.syscall = "readlink";
        e.path = p;
        return e;
      }
    } catch {}
  }
  return err;
}

const origReadlink = fs.readlink;
fs.readlink = function (p, opts, cb) {
  if (typeof opts === "function") {
    cb = opts;
    opts = undefined;
  }
  return origReadlink.call(fs, p, opts, (err, res) => cb(fixErr(err, p), res));
};

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (p, opts) {
  try {
    return origReadlinkSync.call(fs, p, opts);
  } catch (err) {
    throw fixErr(err, p);
  }
};

const origPromise = fs.promises.readlink;
fs.promises.readlink = async function (p, opts) {
  try {
    return await origPromise.call(fs.promises, p, opts);
  } catch (err) {
    throw fixErr(err, p);
  }
};
