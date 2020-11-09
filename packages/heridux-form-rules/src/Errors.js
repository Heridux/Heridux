export class FormWarning extends Error {

  constructor(msg, properties) {
    super(msg)

    this.properties = properties
  }

}

export class FormError extends Error {

  constructor(msg, properties) {
    super(msg)

    this.properties = properties
  }

}
