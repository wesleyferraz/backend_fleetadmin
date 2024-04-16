import { Module } from '@nestjs/common';
import { UserAdminService } from './user-admin.service';
import { UserAdminController } from './user-admin.controller';
import { UserAdmin } from './entities/user-admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserAdminController],
  providers: [UserAdminService],
  imports: [TypeOrmModule.forFeature([UserAdmin])],
})
export class UserAdminModule {}
