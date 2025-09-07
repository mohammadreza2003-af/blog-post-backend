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

  @ApiOperation({
    summary: 'Create tag',
  })
  @ApiResponse({
    status: 200,
    description: 'The tag created successfuly',
  })
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

  @ApiOperation({
    summary: 'Soft Delete tag',
  })
  @ApiResponse({
    status: 200,
    description: 'The soft tag deleted successfuly',
  })
  @Delete('/soft-delete/:id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.softDelete(id);
  }
}
