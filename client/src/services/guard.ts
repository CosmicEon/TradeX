declare global {
  namespace tradeX {
    interface Guard {
      lengthIs(array, length, message): void;
      lengthGreaterThan(array, expected, message): void;
      lengthIsAtLeast(array, expected, message): void;
      stringIsNotEmpty(value, message): void;
      isString(value, message): void;
      isDefined(value, message): void;
      isTrue(value, message): void;
      isFalse(value, message): void;
      isFunction(value, message): void;
      isNumber(value, message): void;
      isObject(value, message): void;
    }
  }
}

export class Guard implements tradeX.Guard {

  constructor(core: jc.Core) { }

  public lengthIs(array, length, message) { if (array.length !== length) { doThrow(message); } }
  public lengthGreaterThan(array, expected, message) { if (array.length < expected) { doThrow(message); } }
  public lengthIsAtLeast(array, expected, message) { if (array.length < expected) { doThrow(message); } }

  public stringIsNotEmpty(value, message) { if (!isString(value) || value === '') { doThrow(message); } }
  public isString(value, message) { if (!isString(value)) { doThrow(message); } }

  public isDefined(value, message) { if (typeof value === 'undefined') { doThrow(message); } }
  public isTrue(value, message) { if (!value) { doThrow(message); } }
  public isFalse(value, message) { if (value) { doThrow(message); } }
  public isFunction(value, message) { if (typeof value !== 'function') { doThrow(message); } }
  public isNumber(value, message) { if (isNaN(value)) { doThrow(message); } }
  public isObject(value, message) { if (typeof value !== 'object') { doThrow(message); } }
}

function isString(value) { return typeof value === 'string' || value instanceof String; }
function doThrow(message) {
  if (typeof message === 'undefined' || message === '') {
    throw new Error('Argument error');
  } else {
    throw new Error(message);
  }
}
