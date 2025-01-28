import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthModule } from './auth/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { User } from './module/user.entity';
import { Task } from './module/task.entity';
import { AuthController } from './api/controllers/auth.controller';
import { AuthService } from './api/services/auth.service';
import { TasksController } from './api/controllers/task.controller';
import { TasksService } from './api/services/task.service';
import { UserAuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    TypeOrmModule.forFeature([User, Task]),
    PassportModule,
    JwtAuthModule,
    UserAuthModule
  ],
  providers: [AuthService, TasksService],
  controllers: [AuthController, TasksController],
})
export class AppModule {}
