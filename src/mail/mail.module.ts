// mail.module.ts
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from 'src/alert/entity/alert.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alert]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: 'admin@i7transportecomercio.com.br',
          pass: 'lagoanova@BA-2024!',
        },
      },
      defaults: {
        from: '"No Reply" <admin@i7transportecomercio.com.br>',
      },
    }),
  ],
  exports: [MailerModule, MailService],
  providers: [MailService],
})
export class MailModule {}
