import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @ApiOperation({
    summary: 'Delete tag',
  })
  @ApiResponse({
    status: 200,
    description: 'The tag deleted successfuly',
  })
  @Delete('/:id')
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }
}
