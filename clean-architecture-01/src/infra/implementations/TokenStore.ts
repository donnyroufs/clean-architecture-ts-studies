import { ITokenStore } from '@Application/common/interfaces/ITokenStore'
import { Redis } from '@Infra/drivers/redis/Redis'
import { Injectable } from '@kondah/core'

@Injectable()
export class TokenStore implements ITokenStore {
  constructor(private readonly _redis: Redis) {}

  async saveToken(id: string, token: string): Promise<void> {
    return this._redis.set(id, token)
  }

  async getToken(id: string): Promise<string | null> {
    return this._redis.get(id)
  }
}
