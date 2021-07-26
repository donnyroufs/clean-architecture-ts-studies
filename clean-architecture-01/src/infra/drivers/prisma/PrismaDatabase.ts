import { Injectable } from '@kondah/core'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaDatabase {
  private readonly _client: PrismaClient

  constructor() {
    this._client = new PrismaClient()
  }

  async connect() {
    return this._client.$connect()
  }

  get user() {
    return this._client.user
  }
}
