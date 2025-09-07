import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const author = await this.userService.findOneById(createPostDto.authorId);

    const tags =
      createPostDto.tags &&
      (await this.tagsService.findMultiTags(createPostDto.tags));

    if (!author) throw new Error('User not found');
    const post = this.postRepository.create({
      ...createPostDto,
      author,
      tags,
    });
    return this.postRepository.save(post);
  }

  async findAll(id: number) {
    return await this.postRepository.find();
  }

  async updatePost(updatePostDto: UpdatePostDto) {
    const tags =
      updatePostDto.tags &&
      (await this.tagsService.findMultiTags(updatePostDto.tags));

    const post = await this.postRepository.findOneBy({
      id: updatePostDto.id,
    });

    if (post) {
      post.title = updatePostDto.title ?? post?.title;
      post.content = updatePostDto.content ?? post?.content;
      post.featuredImageUrl =
        updatePostDto.featuredImageUrl ?? post?.featuredImageUrl;
      post.postType = updatePostDto.postType ?? post?.postType;
      post.slug = updatePostDto.slug ?? post?.slug;
      post.status = updatePostDto.status ?? post?.status;
      post.publishOn = updatePostDto.publishOn ?? post?.publishOn;
      post.tags = tags;
      return await this.postRepository.save(post);
    }
  }

  async deletePost(id: number) {
    await this.postRepository.delete({ id });
    return { deleted: true, id };
  }
}
