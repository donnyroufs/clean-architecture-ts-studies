import { Utils } from '@Domain/common/Utils'

@Describe()
export class UtilsSpec {
  @Test()
  shouldBeDefined() {
    expect(new Utils()).toBeDefined()
  }

  @Test()
  shouldGenerateAnIdInStringFormat() {
    const id = Utils.generateUniqueId()

    expect(id).toBeDefined()
    expect(typeof id).toBe('string')
  }

  @Test()
  shouldAlwaysReturnAnUniqueId() {
    const s1 = Utils.generateUniqueId()
    const s2 = Utils.generateUniqueId()
    const s3 = Utils.generateUniqueId()

    expect(s1 === s2).toBeFalsy()
    expect(s1 === s3).toBeFalsy()
    expect(s2 === s3).toBeFalsy()
  }

  @Test()
  generatedIdShouldBe36CharactersLong() {
    expect(Utils.generateUniqueId()).toHaveLength(36)
  }
}
