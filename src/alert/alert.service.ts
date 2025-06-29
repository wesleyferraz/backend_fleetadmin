// alert.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Alert } from './entity/alert.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from 'src/mail/mail.service';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Injectable()
export class AlertService {
  private readonly logger = new Logger(AlertService.name);

  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    @InjectRepository(Veiculos)
    private veiculoRepository: Repository<Veiculos>,
    private mailService: MailService,
  ) {}

  async createAlert(
    description: string,
    eventDate: Date,
    alertDate: Date,
    email: string,
    veiculoId: number,
  ): Promise<Alert> {
    const veiculo = await this.veiculoRepository.findOne({
      where: { id: veiculoId },
    });
    if (!veiculo) {
      throw new Error('Veículo não encontrado');
    }

    const alert = this.alertRepository.create({
      description,
      eventDate,
      alertDate,
      email,
      veiculo,
    });

    return await this.alertRepository.save(alert);
  }

  async getAllAlerts(): Promise<Alert[]> {
    return await this.alertRepository.find({ relations: ['veiculo'] });
  }

  async getAlertById(id: number): Promise<Alert | null> {
    return await this.alertRepository.findOne({
      where: { id },
      relations: ['veiculo'],
    });
  }

  async updateAlert(
    id: number,
    description: string,
    eventDate: Date,
    alertDate: Date,
    email: string,
    veiculoId: number,
  ): Promise<Alert | null> {
    const alert = await this.getAlertById(id);
    if (!alert) return null;

    // Atualize as propriedades do alerta
    alert.description = description;
    alert.eventDate = eventDate;
    alert.alertDate = alertDate;
    alert.email = email;

    // Atualize o veículo associado, se `veiculoId` for fornecido
    if (veiculoId) {
      const veiculo = await this.veiculoRepository.findOne({
        where: { id: veiculoId },
      });
      if (!veiculo) throw new Error('Veículo não encontrado');
      alert.veiculo = veiculo;
    }

    return await this.alertRepository.save(alert);
  }
  async deleteAlert(id: number): Promise<boolean> {
    const result = await this.alertRepository.delete(id);
    return result.affected > 0;
  }

  @Cron(CronExpression.EVERY_10_SECONDS) // Verifica a cada 10 segundos
  async handleAlerts() {
    this.logger.log('Iniciando verificação de alertas.');
    const now = new Date();
    const todayStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );

    // Busca alertas de hoje que ainda não foram enviados
    const alertsToSend = await this.alertRepository.find({
      where: {
        alertDate: Between(todayStart, now),
        sent: false, // Considera apenas alertas não enviados
      },
    });

    for (const alert of alertsToSend) {
      try {
        await this.mailService.sendAlertMail(
          alert.email,
          'Alerta de Evento',
          `Descrição do evento: ${alert.description}`,
        );

        // Marca o alerta como enviado
        alert.sent = true;
        await this.alertRepository.save(alert);

        this.logger.log(`Alerta ID ${alert.id} enviado para ${alert.email}`);
      } catch (error) {
        this.logger.error(
          `Erro ao enviar alerta ID ${alert.id} para ${alert.email}: ${error.message}`,
        );
      }
    }

    this.logger.log('Verificação de alertas concluída.');
  }
}
