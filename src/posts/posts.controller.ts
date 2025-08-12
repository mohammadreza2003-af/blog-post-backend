import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('{/:id}/')
  getPosts(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }
}
