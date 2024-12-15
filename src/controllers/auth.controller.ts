import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/dtos/request/login.dto';
import { InfoMessage } from 'src/dtos/response/_messages';
import { TokenDto } from 'src/dtos/response/token.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: LoginDto): Promise<InfoMessage<TokenDto>> {
    const tokenDto: TokenDto = await this.authService.signIn(signInDto.userCode, signInDto.password);
    return {
      message: "User Signed In Successfully",
      data: tokenDto,
    }
  }
}