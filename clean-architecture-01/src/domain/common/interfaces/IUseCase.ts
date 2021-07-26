import { Result } from '@Domain/common/Result'

export interface IUseCase<T, E> {
  execute(...args: unknown[]): Promise<Result<T, E>>
}
