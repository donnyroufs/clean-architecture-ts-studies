import { AuthService } from '@application/services/auth.service';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next();
    }

    const user = await this._authService.getUserFromToken(token);

    req.user = user;

    return next();
  }
}
