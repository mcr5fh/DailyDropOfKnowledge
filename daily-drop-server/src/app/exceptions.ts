"use strict";

class BadRequestException {
  readonly message: string;
    readonly name: string;
    readonly error: Error; 
  constructor(message: string) {
    this.message = message || "";
    this.name = "BadRequestException";
    this.error = new Error();
  }
}

const BAD_REQUEST_RESPONSE_CODE=  400;
export {
  BadRequestException,
  BAD_REQUEST_RESPONSE_CODE
};
