import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';

/**
  Users servies
*/
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
    Get all user 
  */

  findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number) {
    console.log(getUserParamDto, limit, page);
    console.log(this.authService.isAuth());
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

  /**
    Get user by id
  */
  findOneById(id: number) {
    console.log(id);

    return {
      firstName: 'Ali',
      lastName: 'Ebrahimi',
    };
  }
}
