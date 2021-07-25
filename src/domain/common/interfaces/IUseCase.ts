import { Result } from '../Result'

export interface IUseCase<T, E> {
  execute(...args: unknown[]): Result<T, E>
}
