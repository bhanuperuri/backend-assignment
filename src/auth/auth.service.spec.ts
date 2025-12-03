import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: { findAll: jest.Mock };
  let jwtService: { sign: jest.Mock };

  beforeEach(async () => {
    userService = {
      // by default there is one user in "database"
      findAll: jest.fn().mockResolvedValue([
        { id: 2, email: 'bhanu@example.com', password: 'secret123' },
      ]),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('fake-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should return token for valid credentials', async () => {
    const result = await authService.login('bhanu@example.com', 'secret123');

    expect(result.message).toBe('Login successful');
    expect(result.token).toBe('fake-jwt-token');
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: 2,
      email: 'bhanu@example.com',
    });
  });

  it('should return "User not found" for unknown email', async () => {
    userService.findAll.mockResolvedValue([]); // no users

    const result = await authService.login('noone@example.com', 'secret123');

    expect(result.message).toBe('User not found');
  });

  it('should return "Wrong password" for invalid password', async () => {
    const result = await authService.login('bhanu@example.com', 'wrong');

    expect(result.message).toBe('Wrong password');
  });
});
