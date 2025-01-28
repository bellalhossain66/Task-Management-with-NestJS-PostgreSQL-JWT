import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto, LoginUserDto } from '../../module/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get('/test')
  async test(@Res() res: Response) {
    try {
      return {
        message: 'Successful',
      };
    } catch (error) {
      return {
        message: 'Failed',
        error: error,
      };
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const { access_token } = await this.authService.login(loginDto);
    return { access_token };
  }
}
