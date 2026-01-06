import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
  const user = await this.userRepository.findOneBy({ id });

  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  return user;
}

 


  remove(id: number) {
    return this.userRepository.delete(id);

  }

  update(id: number, updateUserDto: any) {
  return {
    message: `User ${id} updated successfully`,
    data: updateUserDto,
  };
}

}
