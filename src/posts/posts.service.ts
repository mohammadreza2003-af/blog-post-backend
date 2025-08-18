import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const author = await this.userService.findOneById(createPostDto.authorId);
    if (!author) throw new Error('User not found');
    const post = this.postRepository.create({
      ...createPostDto,
      author,
    });
    return this.postRepository.save(post);
  }

  async findAll(id: number) {
    // const user = this.userService.findOneById(id);
    return await this.postRepository.find();
  }
  async deletePost(id: number) {
    await this.postRepository.delete({ id });
    return { deleted: true, id };
  }
}
