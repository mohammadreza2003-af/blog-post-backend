import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Tag } from 'src/tags/tag.entity';

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
    let tags: Tag[] | undefined = undefined;
    let post: Post | null = null;

    try {
      post = await this.postRepository.findOne({
        where: { id: updatePostDto.id },
        relations: ['tags'],
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request right now. Please try later',
        { description: 'Error fetching post from the database' },
      );
    }

    if (!post) {
      throw new NotFoundException(`Post with ID ${updatePostDto.id} not found`);
    }

    try {
      if (updatePostDto.tags && updatePostDto.tags.length > 0) {
        tags = await this.tagsService.findMultiTags(updatePostDto.tags);
      } else {
        tags = post.tags;
      }
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request right now. Please try later',
        { description: 'Error fetching tags from the database' },
      );
    }

    try {
      const { tags: _, ...updates } = updatePostDto;
      Object.assign(post, { ...updates, tags });
      return await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request right now. Please try later',
        { description: 'Error saving updated post to the database' },
      );
    }
  }

  async deletePost(id: number) {
    await this.postRepository.delete({ id });
    return { deleted: true, id };
  }
}
