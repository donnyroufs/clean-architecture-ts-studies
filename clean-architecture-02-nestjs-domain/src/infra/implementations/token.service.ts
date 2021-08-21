import { Provider } from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { JWTClaims } from '@domain/user/jwt-claims';
import { ITokenService } from '@application/interfaces/ITokenService';
import { TokenServiceToken } from '@application/tokens/token-service.token';

export class TokenService implements ITokenService {
  create(identifier: string): string {
    const claims: JWTClaims = {
      id: identifier,
    };

    return jwt.sign(claims, process.env.JWT_SECRET);
  }

  verify(token: string): boolean {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);

    return !!isValid;
  }

  decode(token: string): JWTClaims {
    const decodedToken = jwt.decode(token, {
      complete: true,
    });

    return {
      id: decodedToken.payload.id,
    };
  }
}

export const TokenServiceProvider: Provider = {
  provide: TokenServiceToken,
  useClass: TokenService,
};
