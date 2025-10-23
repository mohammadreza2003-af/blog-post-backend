import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user-dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  async createMany(createUserDto: CreateUserDto[]): Promise<User[]> {
    const newUsers: User[] = [];
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      for (const user of createUserDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return newUsers;
  }
}
