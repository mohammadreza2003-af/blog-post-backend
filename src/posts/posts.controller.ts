import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('{/:id}/')
  getPosts(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
  }
}
