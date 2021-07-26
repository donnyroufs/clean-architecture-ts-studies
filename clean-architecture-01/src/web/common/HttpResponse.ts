/**
 * @data
 * On all seriousness we do not care about the data return type because this is the
 * very last step of use-case lifecycle. However if you want to you can still pass the
 * proper type as a generic.
 */
export class HttpResponse<T = unknown> {
  constructor(public readonly value: T, public readonly statusCode = 200) {}
}
