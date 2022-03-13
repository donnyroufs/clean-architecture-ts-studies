import { v4 } from "uuid"

export class Post {
  public id = v4()
  public createdAt = new Date()

  public constructor(public title: string, public body: string) {}
}
