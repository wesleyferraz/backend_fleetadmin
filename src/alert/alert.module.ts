import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { Alert } from './entity/alert.entity';
import { MailService } from 'src/mail/mail.service';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert, Veiculos])],
  controllers: [AlertController],
  providers: [AlertService, MailService],
})
export class AlertModule {}
