import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dto';
import * as config from '@nestjs/config';
import profileConfig from './config/profile.config';

/**
  Users servies
*/
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly configService: config.ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: config.ConfigType<
      typeof profileConfig
    >,
  ) {}

  /** 
   Create user 
   */

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException('User is already exists!');
    }

    let newUser = this.userRepository.create(createUserDto);

    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  /**
    Get all user 
  */

  findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number) {
    console.log(getUserParamDto, limit, page);
    console.log(this.authService.isAuth());
    console.log(this.configService.get('PROFILEKEY'));
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
    return this.userRepository.findOneBy({ id });
  }
}
