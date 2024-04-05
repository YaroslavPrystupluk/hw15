class ValidationError extends Error {
  [x: string]: any;
  constructor(message: string, errors: any) {
    super(message);
    this.name = "ValidatorError";
	 this.errors = errors;
  }
}

export { ValidationError };