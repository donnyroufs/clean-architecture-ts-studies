interface IPostModel {
  id: string
  title: string
  body: string
  createdAt: string
}

export class LocalDatabase {
  private _posts: IPostModel[] = []

  public add(entity: "post", data: IPostModel) {
    if (entity !== "post") throw new Error("Entity does not exist.")

    this._posts.push(data)
  }
}
