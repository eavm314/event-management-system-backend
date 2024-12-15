import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

import { auth } from 'src/config/config';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException("No Token is Provided");
      }
      
      const payload = await this.jwtService.verifyAsync(
        token, { secret: auth.jwtSecret }
      );

      const user = await this.userRepository.findOneBy({ userId: payload.sub });

      if (!user) {
        throw new UnauthorizedException("User Was Deleted, Invalid Token");
      }

      request['user'] = payload;
    } catch {
      if (isPublic) {
        return true;
      }
      throw new UnauthorizedException("Invalid Token");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}