import { Energizor, KondahLibrary } from '@kondah/core'

import { UserRepositoryToken } from '@Application/common/tokens/UserRepositoryToken'
import { PrismaDatabase } from '@Infra/drivers/prisma/PrismaDatabase'
import { PrismaUserRepository } from '@Infra/drivers/prisma/repositories/PrismaUserRepository'

export class InfraDependencyInjection extends KondahLibrary {
  configureServices(services: Energizor): void {
    services.register(PrismaDatabase) // LocalDatabase | PrismaDatabase
    services.register(UserRepositoryToken, {
      asClass: PrismaUserRepository, // LocalUserRepository | PrismaUserRepository
    })
  }
}
