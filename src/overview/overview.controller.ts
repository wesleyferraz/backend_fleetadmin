import { Controller, Get, Query } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Overview')
@Controller('overview')
export class OverviewController {
  constructor(private readonly despesasService: OverviewService) {}

  @Get('despesas')
  async getDespesas(
    @Query('veiculoId') veiculoId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    // Verifica se todos os parâmetros obrigatórios foram passados
    if (!veiculoId || !startDate || !endDate) {
      throw new Error(
        'Parâmetros inválidos. Veículo ID, startDate e endDate são obrigatórios.',
      );
    }

    // Chama o serviço para obter as despesas
    return this.despesasService.getDespesasByVeiculoId(
      veiculoId,
      startDate,
      endDate,
    );
  }

  @Get('alldespesas')
  async getAllDespesas(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    // Verifica se todos os parâmetros obrigatórios foram passados
    if (!startDate || !endDate) {
      throw new Error(
        'Parâmetros inválidos. Veículo ID, startDate e endDate são obrigatórios.',
      );
    }

    // Chama o serviço para obter as despesas
    return this.despesasService.getAllDespesas(startDate, endDate);
  }

  @Get('faturamento')
  async getFaturamento(
    @Query('veiculoId') veiculoId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    // Verifica se todos os parâmetros obrigatórios foram passados
    if (!veiculoId || !startDate || !endDate) {
      throw new Error(
        'Parâmetros inválidos. Veículo ID, startDate e endDate são obrigatórios.',
      );
    }

    // Chama o serviço para obter as despesas
    return this.despesasService.getFaturamentoByVeiculoId(
      veiculoId,
      startDate,
      endDate,
    );
  }

  @Get('allfaturamento')
  async getAllFaturamento(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    // Verifica se todos os parâmetros obrigatórios foram passados
    if (!startDate || !endDate) {
      throw new Error(
        'Parâmetros inválidos. Veículo ID, startDate e endDate são obrigatórios.',
      );
    }

    // Chama o serviço para obter as despesas
    return this.despesasService.getAllFaturamento(startDate, endDate);
  }
}
