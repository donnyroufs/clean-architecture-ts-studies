import { Injectable } from '@kondah/core'
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis'
import { ClientOpts } from 'redis'

@Injectable()
export class Redis {
  private _client: WrappedNodeRedisClient

  createClient(options?: ClientOpts) {
    this._client = createNodeRedisClient(options)
  }

  async set(key: string, value: string): Promise<void> {
    this._client.set(key, value)
  }

  async get(key: string): Promise<string | null> {
    return this._client.get(key)
  }
}
