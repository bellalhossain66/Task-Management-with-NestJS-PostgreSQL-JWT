import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../../module/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

const mockUser = {
  id: 1,
  username: 'test',
  password: '$2b$10$Fjvgmagd5GGnHzslXU8dyusvOjeyUEOXnX3iL2H1HtOPJxa6vFtWS',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCIsImJhbGFuY2UiOjQ5LjgsInVzZXJJZCI6InRlc3QiLCJ2ZXJzaW9uIjozMTUsImlhdCI6MTczODE1NTY3MywiZXhwIjoxMDM3ODE1NTY3M30.tTBgjspU7WB1AGeudsmm4ODrIzC77YfxPdmtDOAK0G0'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });
  it('should return a JWT token when login is successful', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    const result = await authService.login({ username: 'test', password: '12345' });
    expect(result).toEqual({ access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCIsImJhbGFuY2UiOjQ5LjgsInVzZXJJZCI6InRlc3QiLCJ2ZXJzaW9uIjozMTUsImlhdCI6MTczODE1NTY3MywiZXhwIjoxMDM3ODE1NTY3M30.tTBgjspU7WB1AGeudsmm4ODrIzC77YfxPdmtDOAK0G0' });
    expect(jwtService.sign).toHaveBeenCalled();
  });
  it('should throw NotFoundException if user does not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    await expect(authService.login({ username: 'wronguser', password: 'password' }))
      .rejects
      .toThrow(NotFoundException);
  });
  it('should throw UnauthorizedException if password is incorrect', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    await expect(authService.login({ username: 'testuser', password: 'wrongpassword' }))
      .rejects
      .toThrow(UnauthorizedException);
  });
});
