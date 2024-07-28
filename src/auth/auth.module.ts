import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserAdminModule } from '../user-admin/user-admin.module';
import { ApiKeyAuthGuard } from './api-key-auth.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiKeyStrategy } from './api-key.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'api-key' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    UserAdminModule,
    ConfigModule,
    JwtModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    ApiKeyAuthGuard,
    ApiKeyStrategy,
  ],
  controllers: [AuthController],
  exports: [JwtAuthGuard, ApiKeyAuthGuard],
})
export class AuthModule {
  constructor() {}
}
