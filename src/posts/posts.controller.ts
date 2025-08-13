import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('{/:id}/')
  getPosts(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create post',
  })
  @ApiResponse({
    status: 201,
    description: 'The post created successfuly',
  })
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
  }

  @ApiOperation({
    summary: 'Update post',
  })
  @ApiResponse({
    status: 200,
    description: 'The post updated successfuly',
  })
  @Patch()
  updatePost(@Body() updatePostDto: UpdatePostDto) {
    console.log(updatePostDto);
  }
}
