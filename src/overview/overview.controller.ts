import { Controller, Get, Query } from '@nestjs/common';
import { OverviewService } from './overview.service';

@Controller('overview') // Corrigido para convenção comum
export class OverviewController {
  constructor(private readonly overviewService: OverviewService) {}

  @Get('faturamento-despesas')
  async getFaturamentoDespesas(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('veiculoIds') veiculoIds?: string,
    @Query('includeCombustivel') includeCombustivel: string = 'true',
    @Query('includeManutencao') includeManutencao: string = 'true',
    @Query('includeSeguro') includeSeguro: string = 'true',
  ) {
    const veiculoIdsArray = veiculoIds
      ? veiculoIds.split(',').map((id) => parseInt(id, 10))
      : [];

    return this.overviewService.getConsolidatedData(
      startDate,
      endDate,
      veiculoIdsArray,
      includeCombustivel === 'true',
      includeManutencao === 'true',
      includeSeguro === 'true',
    );
  }
}
