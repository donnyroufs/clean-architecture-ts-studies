export interface IHashService {
  hashPassword(password: string): Promise<string>;
  verify(password: string, hashedPassword: string): Promise<boolean>;
}
