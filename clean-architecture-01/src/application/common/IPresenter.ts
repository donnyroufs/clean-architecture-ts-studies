/**
 * @Description
 * A presenter should return the final response model from the delivery mechanicsm.
 */
export interface IPresenter<I, O = unknown> {
  present(payload: I): O
}
