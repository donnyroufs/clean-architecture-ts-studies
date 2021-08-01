export class BaseEntity<T extends Record<string, unknown>> {
  constructor(protected readonly props: T, public readonly id?: string) {}
}
