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
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('{/:id}/')
  @ApiOperation({
    summary: 'Fetch all users',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    example: 10,
    description: 'limit users',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    example: 1,
    description: 'page',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Fetched Successfuly',
  })
  getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('create-many')
  createManyUsers(
    @Body() createManyUsersDto: CreateManyUsersDto,
  ): Promise<User[]> {
    return this.userService.createMany(createManyUsersDto);
  }

  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return 'success';
  }
}
