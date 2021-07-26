export interface IUseCase<I> {
  execute<T = unknown>(request: I): Promise<T>
}
