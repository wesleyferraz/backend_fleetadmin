import { Module } from '@nestjs/common';
import { UsersAdminService } from './user-admin.service';
import { UserAdminController } from './user-admin.controller';
import { UsersAdmin } from './entities/user-admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserAdminController],
  providers: [UsersAdminService],
  imports: [TypeOrmModule.forFeature([UsersAdmin])],
  exports: [UsersAdminService],
})
export class UserAdminModule {}
