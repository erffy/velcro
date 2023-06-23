export default class Checker {
  public constructor(data?: any);

  private readonly data: any;

  public isDeveloper(data?: any): boolean;
  public isString(data?: any): boolean;
  public isBoolean(data?: any): boolean;
  public isSymbol(data?: any): boolean;
  public isArray(data?: any): boolean;
  public isObject(data?: any): boolean;
  public isNumber(data?: any): boolean;
  public isBigInt(data?: any): boolean;
  public isFunction(data?: any): boolean;
  public isUndefinedOrNull(data?: any): boolean;
};