import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../module/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from '../../module/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    if (!username && !password) throw new Error('Username and Password requird');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    
    return this.usersRepository.save(user);
  }

  async login(loginDto: LoginUserDto): Promise<{ access_token: string }> {
    const { username, password } = loginDto;
    if (!username && !password) throw new Error('Username and Password requird');
    
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
