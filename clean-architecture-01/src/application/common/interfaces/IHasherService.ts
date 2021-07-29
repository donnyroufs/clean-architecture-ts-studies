export interface IHasherService {
  hashPassword(password: string): Promise<string>
  isValidPassword(hashedPassword: string, password: string): Promise<boolean>
}
