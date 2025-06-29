// alert.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AlertService } from './alert.service';
import { Alert } from './entity/alert.entity';
import { CreateAlertDto } from './dto/createAlert.dto';
import { UpdateAlertDto } from './dto/updateAlert.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Alerta')
@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async createAlert(@Body() body: CreateAlertDto) {
    const { description, eventDate, alertDate, email, veiculoId } = body;
    const alert = await this.alertService.createAlert(
      description,
      new Date(eventDate),
      new Date(alertDate),
      email,
      veiculoId,
    );
    return { message: 'Alerta criado com sucesso', alert };
  }

  @Get()
  async getAllAlerts(): Promise<Alert[]> {
    return await this.alertService.getAllAlerts();
  }

  @Get(':id')
  async getAlertById(@Param('id') id: number): Promise<Alert> {
    const alert = await this.alertService.getAlertById(id);
    if (!alert) {
      throw new NotFoundException('Alerta não encontrado');
    }
    return alert;
  }

  @Put(':id')
  async updateAlert(@Param('id') id: number, @Body() body: UpdateAlertDto) {
    const { description, eventDate, alertDate, email, veiculoId } = body;
    const updatedAlert = await this.alertService.updateAlert(
      id,
      description,
      new Date(eventDate),
      new Date(alertDate),
      email,
      veiculoId,
    );
    if (!updatedAlert) {
      throw new NotFoundException('Alerta não encontrado');
    }
    return { message: 'Alerta atualizado com sucesso', updatedAlert };
  }

  @Delete(':id')
  async deleteAlert(@Param('id') id: number) {
    const deleted = await this.alertService.deleteAlert(id);
    if (!deleted) {
      throw new NotFoundException('Alerta não encontrado');
    }
    return { message: 'Alerta deletado com sucesso' };
  }
}
