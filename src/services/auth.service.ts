import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

import { TokenDto } from 'src/dtos/response/token.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) { }

  async signIn(userCode: string, password: string): Promise<TokenDto> {
    const user = await this.userRepository.findOneBy({ userCode });
    if (!user) {
      throw new NotFoundException("User Code Not Found");
    }

    const authorized = bcrypt.compareSync(password, user.password);

    if (!authorized) {
      throw new UnauthorizedException("Incorrect User or Password");
    }

    const payload = { sub: user.userId, userCode: user.userCode, userRole: user.role?.roleCode };
    const token = await this.jwtService.signAsync(payload);

    return new TokenDto(user.userCode, token);
  }
}