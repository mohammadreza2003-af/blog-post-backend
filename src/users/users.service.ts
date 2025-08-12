import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from './dtos/get-users-param.dto';

@Injectable()
export class UsersService {
  findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number) {
    console.log(getUserParamDto, limit, page);
    return [
      {
        firstName: 'Ali',
        lastName: 'Ebrahimi',
      },
      {
        firstName: 'Nasro',
        lastName: 'Karimi',
      },
    ];
  }
  findOneById(id: number) {
    console.log(id);
    return {
      firstName: 'Ali',
      lastName: 'Ebrahimi',
    };
  }
}
