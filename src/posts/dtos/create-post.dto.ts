import { statusType } from '../enums/post-status.enum';
import { PostType } from '../enums/post-type.enum';

export class CreatePostDto {
  title: string;
  postType: PostType;
  slug: string;
  status: statusType;
  content?: string;
  schema?: string;
  featuredImageUrl?: string;
  publishOn: Date;
  tags: string[];
  metaOptions: Record<string, string>[];
}
