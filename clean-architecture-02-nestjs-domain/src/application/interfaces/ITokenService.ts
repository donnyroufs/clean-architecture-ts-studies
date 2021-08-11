import { BaseEntity } from '@domain/common/base-entity';

export interface ITokenService {
  create(identifier: BaseEntity<any>['id']): Promise<string> | string;
  verify(token: string): boolean;
}
