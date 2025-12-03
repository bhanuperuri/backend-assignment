import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // 1. find all users
    const users = await this.userService.findAll();

    // 2. match email
    const user = users.find((u) => u.email === email);

    if (!user) {
      return { message: 'User not found' };
    }

    // 3. check password
    if (user.password !== password) {
      return { message: 'Wrong password' };
    }

    // 4. create JWT token
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return {
      message: 'Login successful',
      token: token,
    };
  }
}
