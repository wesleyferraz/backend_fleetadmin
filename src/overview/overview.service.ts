import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Abastecimento } from 'src/abastecimento/entities/abastecimento.entity';
import { Seguros } from 'src/seguro/entities/seguro.entity';
import { Viagem } from 'src/viagem/entity/viagem.entity';

import { addMonths, differenceInMonths } from 'date-fns';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(ManutencoesCorretivas)
    private manutencaoRepository: Repository<ManutencoesCorretivas>,

    @InjectRepository(Abastecimento)
    private abastecimentoRepository: Repository<Abastecimento>,

    @InjectRepository(Seguros)
    private seguroRepository: Repository<Seguros>,

    @InjectRepository(Viagem)
    private viagemRepository: Repository<Viagem>,
  ) {}

  async getDespesasByVeiculoId(
    veiculoId: number,
    startDate: string,
    endDate: string,
  ) {
    const despesas = [];

    // Despesas de manutenção
    const manutencao = await this.manutencaoRepository
      .createQueryBuilder('manutencao')
      .leftJoinAndSelect('manutencao.veiculoId', 'veiculoId')
      .where('manutencao.veiculoId = :veiculoId', { veiculoId })
      .andWhere('manutencao.data BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'manutencao.id',
        'manutencao.valorTotal',
        'manutencao.data',
        'manutencao.veiculoId',
        'veiculoId.id',
      ])
      .getMany();

    manutencao.forEach((item) => {
      despesas.push({
        tipo: 'Manutenção',
        id: item.id,
        valor: item.valorTotal,
        data: item.data,
        veiculoId: item.veiculoId?.id,
      });
    });

    // Despesas de abastecimento
    const abastecimento = await this.abastecimentoRepository
      .createQueryBuilder('abastecimento')
      .leftJoinAndSelect('abastecimento.veiculo', 'veiculo')
      .where('abastecimento.veiculo = :veiculoId', { veiculoId })
      .andWhere('abastecimento.data BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'abastecimento.id',
        'abastecimento.valor_total',
        'abastecimento.data',
        'veiculo.id',
      ])
      .getMany();

    abastecimento.forEach((item) => {
      despesas.push({
        tipo: 'Abastecimento',
        id: item.id,
        valor: item.valor_total,
        data: item.data,
        veiculoId: item.veiculo?.id,
      });
    });

    // Obter despesas de seguro e gerar valores mensais

    const seguros = await this.seguroRepository
      .createQueryBuilder('seguro')
      .leftJoinAndSelect('seguro.veiculoId', 'veiculoId')
      .where('seguro.veiculoId = :veiculoId', { veiculoId })
      .andWhere('seguro.dataVencimento BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'seguro.id',
        'seguro.valorMensal',
        'seguro.dataVencimento',
        'veiculoId',
      ])
      .getMany();

    // Calcular a quantidade de meses entre dataInicio e dataFim
    const mesesNoPeriodo = differenceInMonths(endDate, startDate) + 1; // corrigido para retornar número

    seguros.forEach((item) => {
      for (let i = 0; i < mesesNoPeriodo; i++) {
        const dataReferencia = addMonths(startDate, i);

        despesas.push({
          tipo: 'Seguro',
          id: item.id,
          valor: item.valorMensal,
          data: dataReferencia,
          veiculoId: item.veiculoId?.id,
        });
      }
    });

    // Despesas de viagens (remuneração do motorista)
    const viagens = await this.viagemRepository
      .createQueryBuilder('viagem')
      .leftJoinAndSelect('viagem.veiculo', 'veiculo')
      .where('viagem.veiculoId = :veiculoId', { veiculoId })
      .andWhere('viagem.dataCarregamento BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'viagem.id',
        'viagem.remuneracaoMotorista',
        'viagem.motoristaId',
        'viagem.dataCarregamento',
        'veiculo.id', // ID do veículo relacionado
      ])
      .getMany();

    viagens.forEach((item) => {
      despesas.push({
        tipo: 'Motorista',
        id: item.id,
        motoristaId: item.motorista,
        valor: item.remuneracaoMotorista,
        data: item.dataCarregamento,
        veiculoId: item.veiculo?.id,
      });
    });

    return despesas;
  }

  async getFaturamentoByVeiculoId(
    veiculoId: number,
    startDate: string,
    endDate: string,
  ) {
    const lucro = [];

    // Despesas de viagens (remuneração do motorista)
    const viagens = await this.viagemRepository
      .createQueryBuilder('viagem')
      .leftJoinAndSelect('viagem.veiculo', 'veiculo')
      .where('viagem.veiculoId = :veiculoId', { veiculoId })
      .andWhere('viagem.dataCarregamento BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'viagem.id',
        'viagem.remuneracaoMotorista',
        'viagem.motoristaId',
        'viagem.dataCarregamento',
        'viagem.dataDescarregamento',
        'viagem.valorTotal',
        'veiculo.id', // ID do veículo relacionado
      ])
      .getMany();

    viagens.forEach((item) => {
      lucro.push({
        viagemId: item.id,
        motoristaId: item.motorista,
        valor: item.remuneracaoMotorista,
        dataCarregamento: item.dataCarregamento,
        dataDescarregamento: item.dataDescarregamento,
        frete: item.valorTotal,
        lucro: item.valorTotal - item.remuneracaoMotorista,
        veiculoId: item.veiculo.id,
      });
    });

    return lucro;
  }

  async getAllDespesas(startDate: string, endDate: string) {
    const despesas = [];

    const manutencao = await this.manutencaoRepository
      .createQueryBuilder('manutencao')
      .leftJoinAndSelect('manutencao.veiculoId', 'veiculoId')
      .andWhere('manutencao.data BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'manutencao.id',
        'manutencao.valorTotal',
        'manutencao.data',
        'veiculoId.id',
      ])
      .getMany();

    manutencao.forEach((item) => {
      despesas.push({
        tipo: 'Manutenção',
        id: item.id,
        valor: item.valorTotal,
        data: item.data,
        veiculoId: item.veiculoId?.id,
      });
    });

    const abastecimento = await this.abastecimentoRepository
      .createQueryBuilder('abastecimento')
      .leftJoinAndSelect('abastecimento.veiculo', 'veiculo')
      .andWhere('abastecimento.data BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'abastecimento.id',
        'abastecimento.valor_total',
        'abastecimento.data',
        'veiculo.id',
      ])
      .getMany();

    abastecimento.forEach((item) => {
      despesas.push({
        tipo: 'Abastecimento',
        id: item.id,
        valor: item.valor_total,
        data: item.data,
        veiculoId: item.veiculo?.id || null,
      });
    });

    //Seguros

    const seguros = await this.seguroRepository
      .createQueryBuilder('seguro')
      .leftJoinAndSelect('seguro.veiculoId', 'veiculoId')
      .andWhere('seguro.dataVencimento BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'seguro.id',
        'seguro.valorMensal',
        'seguro.dataVencimento',
        'veiculoId',
      ])
      .getMany();

    // Calcular a quantidade de meses entre dataInicio e dataFim
    const mesesNoPeriodo = differenceInMonths(endDate, startDate) + 1; // corrigido para retornar número

    seguros.forEach((item) => {
      for (let i = 0; i < mesesNoPeriodo; i++) {
        const dataReferencia = addMonths(startDate, i);

        despesas.push({
          tipo: 'Seguro',
          id: item.id,
          valor: item.valorMensal,
          data: dataReferencia,
          veiculoId: item.veiculoId?.id,
        });
      }
    });

    const viagens = await this.viagemRepository
      .createQueryBuilder('viagem')
      .leftJoinAndSelect('viagem.veiculo', 'veiculo')
      .andWhere('viagem.dataCarregamento BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'viagem.id',
        'viagem.remuneracaoMotorista',
        'viagem.dataCarregamento',
        'veiculo.id',
      ])
      .getMany();

    viagens.forEach((item) => {
      despesas.push({
        tipo: 'Motorista',
        id: item.id,
        valor: item.remuneracaoMotorista,
        data: item.dataCarregamento,
        veiculoId: item.veiculo?.id || null,
      });
    });

    return despesas;
  }

  async getAllFaturamento(startDate: string, endDate: string) {
    const lucro = [];

    // Obter dados das viagens com relacionamentos
    const viagens = await this.viagemRepository
      .createQueryBuilder('viagem')
      .leftJoinAndSelect('viagem.veiculo', 'veiculo') // Inclui o relacionamento com veiculo
      .andWhere('viagem.dataCarregamento BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'viagem.id', // ID da viagem
        'viagem.remuneracaoMotorista', // Remuneração do motorista
        'viagem.dataCarregamento', // Data de carregamento
        'viagem.dataDescarregamento', // Data de descarregamento
        'viagem.valorTotal', // Valor total
        'veiculo.id', // ID do veículo relacionado
      ])
      .getMany();

    // Montar o objeto de retorno com cálculo de lucro
    viagens.forEach((item) => {
      lucro.push({
        viagemId: item.id,
        veiculoId: item.veiculo.id, // Obter o ID do veículo
        valor: item.remuneracaoMotorista,
        dataCarregamento: item.dataCarregamento,
        dataDescarregamento: item.dataDescarregamento,
        frete: item.valorTotal,
        lucro: item.valorTotal - item.remuneracaoMotorista,
      });
    });

    return lucro;
  }
}
