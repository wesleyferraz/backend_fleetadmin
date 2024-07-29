import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faturamento } from 'src/faturamento/entity/faturamento.entity';
import { Combustivel } from 'src/combustivel/entities/combustivel.entity';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Seguros } from 'src/seguro/entities/seguro.entity';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(Faturamento)
    private faturamentoRepository: Repository<Faturamento>,
    @InjectRepository(Combustivel)
    private combustivelRepository: Repository<Combustivel>,
    @InjectRepository(ManutencoesCorretivas)
    private manutencaoRepository: Repository<ManutencoesCorretivas>,
    @InjectRepository(Seguros)
    private seguroRepository: Repository<Seguros>,
  ) {}

  async getConsolidatedData(
    startDate?: string,
    endDate?: string,
    veiculoIds?: number[],
    includeCombustivel: boolean = true,
    includeManutencao: boolean = true,
    includeSeguro: boolean = true,
  ): Promise<any> {
    const faturamentoQuery =
      this.faturamentoRepository.createQueryBuilder('faturamento');
    const combustivelQuery =
      this.combustivelRepository.createQueryBuilder('combustivel');
    const manutencaoQuery = this.manutencaoRepository.createQueryBuilder(
      'manutencoesCorretivas',
    );
    const seguroQuery = this.seguroRepository.createQueryBuilder('seguros');

    if (startDate) {
      faturamentoQuery.andWhere('faturamento.dataCarregamento >= :startDate', {
        startDate,
      });
      combustivelQuery.andWhere('combustivel.data >= :startDate', {
        startDate,
      });
      manutencaoQuery.andWhere('manutencoesCorretivas.data >= :startDate', {
        startDate,
      });
      seguroQuery.andWhere('seguros.dataVencimento >= :startDate', {
        startDate,
      });
    }
    if (endDate) {
      faturamentoQuery.andWhere('faturamento.dataCarregamento <= :endDate', {
        endDate,
      });
      combustivelQuery.andWhere('combustivel.data <= :endDate', { endDate });
      manutencaoQuery.andWhere('manutencoesCorretivas.data <= :endDate', {
        endDate,
      });
      seguroQuery.andWhere('seguros.dataVencimento <= :endDate', { endDate });
    }
    if (veiculoIds && veiculoIds.length > 0) {
      faturamentoQuery.andWhere('faturamento.veiculoId IN (:...veiculoIds)', {
        veiculoIds,
      });
      combustivelQuery.andWhere('combustivel.veiculo_id IN (:...veiculoIds)', {
        veiculoIds,
      });
      manutencaoQuery.andWhere(
        'manutencoesCorretivas.veiculoId IN (:...veiculoIds)',
        { veiculoIds },
      );
      seguroQuery.andWhere('seguros.veiculoId IN (:...veiculoIds)', {
        veiculoIds,
      });
    }

    const faturamento = await faturamentoQuery.getMany();
    const combustivel = includeCombustivel
      ? await combustivelQuery.getMany()
      : [];
    const manutencao = includeManutencao ? await manutencaoQuery.getMany() : [];
    const seguro = includeSeguro ? await seguroQuery.getMany() : [];

    const consolidatedData = {};

    faturamento.forEach((f) => {
      const monthYear = `${f.dataCarregamento.getFullYear()}-${(f.dataCarregamento.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!consolidatedData[monthYear]) {
        consolidatedData[monthYear] = {
          faturamento: 0,
          despesas: { combustivel: 0, manutencao: 0, seguro: 0, total: 0 },
        };
      }
      consolidatedData[monthYear].faturamento += Number(f.valorTotal);
    });

    if (includeCombustivel) {
      combustivel.forEach((c) => {
        const monthYear = `${c.data.getFullYear()}-${(c.data.getMonth() + 1).toString().padStart(2, '0')}`;
        if (!consolidatedData[monthYear]) {
          consolidatedData[monthYear] = {
            faturamento: 0,
            despesas: { combustivel: 0, manutencao: 0, seguro: 0, total: 0 },
          };
        }
        consolidatedData[monthYear].despesas.combustivel += Number(
          c.valor_total,
        );
        consolidatedData[monthYear].despesas.total += Number(c.valor_total);
      });
    }

    if (includeManutencao) {
      manutencao.forEach((m) => {
        const monthYear = `${m.data.getFullYear()}-${(m.data.getMonth() + 1).toString().padStart(2, '0')}`;
        if (!consolidatedData[monthYear]) {
          consolidatedData[monthYear] = {
            faturamento: 0,
            despesas: { combustivel: 0, manutencao: 0, seguro: 0, total: 0 },
          };
        }
        consolidatedData[monthYear].despesas.manutencao += Number(m.valorTotal);
        consolidatedData[monthYear].despesas.total += Number(m.valorTotal);
      });
    }

    if (includeSeguro) {
      seguro.forEach((s) => {
        const monthYear = `${s.dataVencimento.getFullYear()}-${(s.dataVencimento.getMonth() + 1).toString().padStart(2, '0')}`;
        if (!consolidatedData[monthYear]) {
          consolidatedData[monthYear] = {
            faturamento: 0,
            despesas: { combustivel: 0, manutencao: 0, seguro: 0, total: 0 },
          };
        }
        consolidatedData[monthYear].despesas.seguro += Number(s.valorMensal);
        consolidatedData[monthYear].despesas.total += Number(s.valorMensal);
      });
    }

    // Calcular a participação de cada tipo de despesa
    Object.keys(consolidatedData).forEach((key) => {
      const data = consolidatedData[key];
      const totalDespesas = data.despesas.total;
      if (totalDespesas > 0) {
        data.despesas.combustivelParticipacao =
          (data.despesas.combustivel / totalDespesas) * 100;
        data.despesas.manutencaoParticipacao =
          (data.despesas.manutencao / totalDespesas) * 100;
        data.despesas.seguroParticipacao =
          (data.despesas.seguro / totalDespesas) * 100;
      } else {
        data.despesas.combustivelParticipacao = 0;
        data.despesas.manutencaoParticipacao = 0;
        data.despesas.seguroParticipacao = 0;
      }
    });

    return consolidatedData;
  }
}
