import { NotAuthenticatedException } from '@application/exceptions/not-authenticated.exception';
import { AuthService } from '@application/services/auth.service';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.getTokenFromHeader(req.headers);

    if (!token) {
      return next();
    }

    const isValid = this._authService.isValid(token);

    if (!isValid) {
      throw new NotAuthenticatedException();
    }

    const user = await this._authService.getUserFromToken(token);

    req.user = user;

    return next();
  }

  private getTokenFromHeader(headers: IncomingHttpHeaders) {
    return headers.authorization?.split(' ')[1];
  }
}
