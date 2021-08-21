import { BaseModel } from '@infra/common/base-model';
import { Injectable } from '@nestjs/common';
import { Post as PrismaPost, Visibility } from '@prisma/client';

@Injectable()
export class PostModel extends BaseModel<string> implements PrismaPost {
  title: string;
  slug: string;
  content: string;
  visibility: Visibility;
  authorId: string;
}
