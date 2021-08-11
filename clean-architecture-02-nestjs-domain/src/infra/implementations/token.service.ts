import { ITokenService } from '@application/interfaces/ITokenService';
import jwt from 'jsonwebtoken';

export class TokenService implements ITokenService {
  create(identifier: string): string {
    return jwt.sign(identifier, process.env.JWT_SECRET);
  }

  verify(token: string): boolean {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);

    return !!isValid;
  }
}
