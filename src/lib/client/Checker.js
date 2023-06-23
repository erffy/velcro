import config from "../../bot.config.js";

export default class Checker {
  /**
   * Create new Checker.
   * @param {any} data
   * @constructor
   */
  constructor(data) {
    /**
     * @readonly
     * @private
     */
    this.data = data;
  };

  isDeveloper(data) {
    return config.Bot.developers.includes(data ?? this.data);
  };

  isString(data) {
    return (typeof (data ?? this.data) === "string");
  };

  isBoolean(data) {
    return (typeof (data ?? this.data) === "boolean");
  };

  isSymbol(data) {
    return (typeof (data ?? this.data) === "symbol");
  };

  isArray(data) {
    return (Array.isArray(data ?? this.data));
  };

  isObject(data) {
    return (typeof (data ?? this.data) === "object");
  };

  isNumber(data) {
    return (typeof (data ?? this.data) === "number");
  };

  isBigInt(data) {
    return (typeof (data ?? this.data) === "bigint");
  };

  isFunction(data) {
    return (typeof (data ?? this.data) === "function");
  };

  isUndefinedOrNull(data) {
    return (typeof (data ?? this.data) === "undefined" || (data ?? this.data) === null);
  };
};