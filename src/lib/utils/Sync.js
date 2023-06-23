import { globSync as sync } from "glob";
import graceful from "graceful-fs";
import os from "node:os";

let platform = os.platform();

/**
 * @param {string} path
 * @returns {Array<string>}
 */
export default function __sync(path) {
  let __results = sync(`./${path}`, {
    absolute: true,
    fs: {
      readdir: graceful.readdir,
      readdirSync: graceful.readdirSync,
      readlinkSync: graceful.readlinkSync,
      lstatSync: graceful.lstatSync,
      realpathSync: graceful.realpathSync,
      promises: graceful.promises
    }
  });

  let __data = [];
  if (platform === "win32") {
    let drive = (os.homedir()).split("/")[1];

    for (let index = 0; index < __results.length; index++) __data.unshift(`file://${drive}/${__results[index]}`);

    return __data;
  };

  return __results;
};