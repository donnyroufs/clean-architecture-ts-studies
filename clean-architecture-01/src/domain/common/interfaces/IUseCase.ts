import { Result } from '@Domain/common/Result'

export interface IUseCase<I, O> {
  execute(request: I): Promise<Result<O, string>>
}
