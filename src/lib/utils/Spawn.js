import { fork } from "node:child_process";

/**
 * Create new Process.
 * @param {string} path 
 * @param {import("child_process").ForkOptions} options
 * @returns {import("child_process").ChildProcess}
 */
export default function spawn(path, options) {
  const proc = fork(path, (options ?? {}));

  proc.on('exit', (code, signal) => spawn(path));

  return proc;
};