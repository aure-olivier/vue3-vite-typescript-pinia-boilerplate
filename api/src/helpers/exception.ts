export class AppError extends Error {
  readonly id: number

  // base constructor only accepts string message as an argument
  // we extend it here to accept an object, allowing us to pass other data
  constructor({ id, name, message }) {
    super(message)
    this.name = name // this property is defined in parent
    this.id = id
  }
}