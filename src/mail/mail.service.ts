// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAlertMail(to: string, subject: string, text: string) {
    await this.mailerService.sendMail({
      from: 'admin@i7transportecomercio.com.br',
      to,
      subject,
      text,
    });
  }
}
