export class Guard {
  static againstNullOrDefined<T extends Record<string, unknown>>(target: T) {
    return Object.values(target).every((prop) => prop != null);
  }
}
