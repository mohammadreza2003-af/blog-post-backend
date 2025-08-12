import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UsersService) {}
  findAll(id: number) {
    const user = this.userService.findOneById(id);
    console.log(id);
    return [
      {
        user,
        title: 'test',
        content: 'rest',
      },
    ];
  }
}
