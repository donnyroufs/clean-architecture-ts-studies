export interface IMapper<T, O, P = unknown> {
  toPersistance(domain: T): P;
  // toDomain(model: any): T & { id: BaseEntity<any>['id'] };
  toDomain(model: any): any;
  toWorld(domain: T): O;
}
