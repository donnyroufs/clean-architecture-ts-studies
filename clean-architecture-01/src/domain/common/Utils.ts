// We can probably replace our 'fancy' UUID generator with an external npm package. Having source code dependencies is a
// no go in the Domain layer. We can make exceptions for external dependencies. The question here is, when we decide on an external dependency,
// what kind of rules would the outer layers have to follow? And can there be consequences for the Domain layer itself?

export class Utils {
  static generateUniqueId() {
    const S4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)

    return S4().repeat(8).toLocaleLowerCase()
  }
}
