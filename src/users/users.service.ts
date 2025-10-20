import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
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
    let existingUser: User | null = null;
    try {
      existingUser = await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request right now. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('User is already exists!');
    }
    let newUser: User | null = null;
    try {
      newUser = this.userRepository.create(createUserDto);
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request right now. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

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
  async findOneById(id: number) {
    let user: User | null = null;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request right now. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!user) throw new BadRequestException('The user id does not exist');
    return user;
  }
}
