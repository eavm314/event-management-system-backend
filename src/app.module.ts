import { MiddlewareConsumer, Module, NestModule, RequestMethod, } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSource } from './config/dataSource';
import { AreaEntity } from './entities/area.entity';
import { CoordinatorEntity } from './entities/coordinator.entity';
import { EventEntity } from './entities/event.entity';
import { PageEntity } from './entities/page.entity';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { CommonExceptionsInterceptor } from './interceptors/common-exceptions.interceptor';
import { EventMiddleware } from './middlewares/event.middleware';
import { AuthModule } from './modules/auth.module';
import { DataModule } from './modules/data.module';
import { EventModule } from './modules/event.module';
import { StudentModule } from './modules/student.module';
import { UserModule } from './modules/user.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';

@Module({
  imports: [
    AuthModule,
    UserModule,
    StudentModule,
    EventModule,
    DataModule,
    TypeOrmModule.forRoot(dataSource),
    TypeOrmModule.forFeature([
      PageEntity,
      UserEntity,
      RoleEntity,
      EventEntity,
      AreaEntity,
      CoordinatorEntity
    ]),
    MorganModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CommonExceptionsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor("combined"),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EventMiddleware)
      .forRoutes({ path: 'events', method: RequestMethod.POST });
  }
}
