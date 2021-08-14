import { Exclude } from 'class-transformer';

export function Contract() {
  return (target: any) => {
    Exclude()(target);
  };
}
