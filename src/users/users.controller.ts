import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  @Get('{/:id}/')
  getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(getUserParamDto, typeof getUserParamDto);
    console.log(limit, page);
    return 'success';
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'success';
  }

  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return 'success';
  }
}
