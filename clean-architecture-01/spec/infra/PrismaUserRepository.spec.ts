import { mocked } from 'ts-jest/utils'
import { PrismaUserRepository } from '@Infra/drivers/prisma/repositories/PrismaUserRepository'
import { PrismaDatabase } from '@Infra/drivers/prisma/PrismaDatabase'
import { UserEntity } from '@Domain/entities/UserEntity'
import { PrismaUserModel } from '@Infra/drivers/prisma/models/PrismaUserModel'

jest.mock('@Infra/drivers/prisma/PrismaDatabase')

function changeCreateReturnValue(newValue: boolean) {
  mocked(PrismaDatabase as any).mockImplementation(() => ({
    user: {
      create: () => newValue,
    },
  }))
}

@Describe()
export class PrismaUserRepositorySpec {
  @Test()
  ShouldBeDefined() {
    const repo = new PrismaUserRepository(new PrismaDatabase())

    expect(repo).toBeDefined()
  }

  @Test()
  async ShouldMapTheDomainEntityToAPrismaModel() {
    changeCreateReturnValue(true)

    const db = new PrismaDatabase()
    const repo = new PrismaUserRepository(db)
    const spy = jest.spyOn(db.user, 'create')

    await repo.save(UserEntity.create('john', 'doe'))

    expect(spy.mock.calls[0][0].data).toBeInstanceOf(PrismaUserModel)
  }

  @Test()
  async ShouldReturnFalseWhenFailedToPersistUser() {
    changeCreateReturnValue(false)

    const repo = new PrismaUserRepository(new PrismaDatabase())

    const result = await repo.save(UserEntity.create('john', 'doe'))

    expect(result).toBeFalsy()
  }

  @Test()
  async ShouldReturnTrueWhenSuccessPersistingUser() {
    changeCreateReturnValue(true)

    const repo = new PrismaUserRepository(new PrismaDatabase())
    const result = await repo.save(UserEntity.create('john', 'doe'))

    expect(result).toBeTruthy()
  }
}
