/**
 * @Generic I - Request Model
 * @Generic O - Response Model
 */
export interface IUseCase<I, O> {
  execute(model: I): Promise<O>;
}
