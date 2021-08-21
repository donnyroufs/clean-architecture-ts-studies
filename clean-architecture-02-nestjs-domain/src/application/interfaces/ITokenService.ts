import { BaseEntity } from '@domain/common/base-entity';
import { JWTClaims } from '@domain/user/jwt-claims';

export interface ITokenService {
  create(identifier: BaseEntity<any>['id']): Promise<string> | string;
  verify(token: string): boolean;
  decode(token: string): JWTClaims;
}
