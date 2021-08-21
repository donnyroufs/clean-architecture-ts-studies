import { Injectable } from '@nestjs/common';
import { DBService } from './db.service';

@Injectable()
export class DBContext {
  get user() {
    return this._dbService.user;
  }

  get post() {
    return this._dbService.post;
  }

  constructor(private readonly _dbService: DBService) {}
}
