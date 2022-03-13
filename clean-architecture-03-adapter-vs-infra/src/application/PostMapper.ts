import { Post } from "src/domain/Post"
import { ICreatePostDTO } from "./ICreatePostDTO"
import { IPostDTO } from "./PostDTO"

export class PostMapper {
  public static fromCreateDTO(dto: ICreatePostDTO) {
    return new Post(dto.title, dto.body)
  }

  public static toDTO(dto: Post): IPostDTO {
    return {
      title: dto.title,
      body: dto.body,
      createdAt: dto.createdAt,
    }
  }
}
