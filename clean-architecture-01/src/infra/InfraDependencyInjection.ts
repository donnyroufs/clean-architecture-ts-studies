import { Energizor, KondahLibrary } from '@kondah/core'

import { IUserRepositoryToken } from '@Application/common/interfaces/IUserRepository'
import { PrismaDatabase } from '@Infra/drivers/prisma/PrismaDatabase'
import { PrismaUserRepository } from '@Infra/drivers/prisma/repositories/PrismaUserRepository'

export class InfraDependencyInjection extends KondahLibrary {
  configureServices(services: Energizor): void {
    services.register(PrismaDatabase) // LocalDatabase | PrismaDatabase
    services.register(IUserRepositoryToken, {
      asClass: PrismaUserRepository, // LocalUserRepository | PrismaUserRepository
    })
  }
}
