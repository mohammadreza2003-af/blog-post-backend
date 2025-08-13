import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostType } from './enums/post-type.enum';
import { PostStatusType } from './enums/post-status.enum';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.POST,
    nullable: false,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: PostStatusType,
    nullable: false,
    default: PostStatusType.DRAFT,
  })
  status: PostStatusType;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn?: Date;

  tags?: string[];

  metaOptions?: CreatePostMetaOptionsDto[];
}
