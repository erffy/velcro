import { Collection } from "discord.js";
import { s } from "@sapphire/shapeshift";

const __store = {};

/**
 * @param {{ name: string, overWrite?: boolean }} options 
 * @returns {Collection<string, any>}
 */
export default function _Storage(options = { name: null, overWrite: false }) {
  let { name, overWrite } = options;
  overWrite ??= false;

  s.boolean.parse(overWrite);
  s.string.parse(name);

  if (__store[name] && !overWrite) return __store[name];
  if (!__store[name]) __store[name] = new Collection();

  return __store[name];
};