export interface ITokenStore {
  saveToken(id: string, token: string): Promise<void>
  getToken(id: string): Promise<string | null>
}
