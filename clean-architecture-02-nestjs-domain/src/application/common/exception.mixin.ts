export class ExceptionMixin {
  static create(msg: string) {
    return class extends Error {
      constructor() {
        super(msg);
      }
    };
  }
}
