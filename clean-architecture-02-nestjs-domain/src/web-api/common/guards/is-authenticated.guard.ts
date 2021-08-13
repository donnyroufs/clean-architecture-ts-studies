import { AuthService } from '@application/services/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private readonly _authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    return !!req.user;
  }
}
