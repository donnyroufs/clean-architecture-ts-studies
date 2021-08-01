export interface IMapper<T, O, P = unknown> {
  toPersistence(domain: T): P;
  // toDomain(model: any): T & { id: BaseEntity<any>['id'] };
  toDomain(model: any): any;
  toWorld(domain: T): O;
}
