/**
 * @Description
 * A presenter should return the final response model from the delivery mechanicsm.
 */
export interface IPresenter<I, E = Error, O = any> {
  present(port: I | E): O
}
