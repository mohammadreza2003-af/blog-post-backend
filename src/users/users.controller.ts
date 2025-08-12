import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('{/:id}/')
  getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(id, typeof id);
    console.log(limit, page);
    return 'success';
  }
}
