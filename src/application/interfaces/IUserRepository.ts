export interface IUserRepository {
  getUserMoney(id: string): number | null
}
