import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManutencoesCorretivas } from './entities/manutencao-corretiva.entity';
import { CreateManutencaoCorretivaDto } from './dto/create-manutencao-corretiva.dto';
import { UpdateManutencaoCorretivaDto } from './dto/update-manutencao-corretiva.dto';
import { Oficinas } from 'src/oficina/entities/oficina.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Injectable()
export class ManutencaoCorretivaService {
  constructor(
    @InjectRepository(ManutencoesCorretivas)
    private readonly manutencaoCorretivaRepository: Repository<ManutencoesCorretivas>,
    @InjectRepository(Oficinas)
    private readonly oficinaRepository: Repository<Oficinas>,
    @InjectRepository(Veiculos)
    private readonly veiculoRepository: Repository<Veiculos>,
  ) {}

  async create(
    createManutencaoCorretivaDto: CreateManutencaoCorretivaDto,
  ): Promise<ManutencoesCorretivas> {
    const oficina = await this.oficinaRepository.findOne({
      where: { id: createManutencaoCorretivaDto.oficinaId },
    });
    const veiculo = await this.veiculoRepository.findOne({
      where: { id: createManutencaoCorretivaDto.veiculoId },
    });

    if (!oficina || !veiculo) {
      throw new NotFoundException('Oficina ou Veículo não encontrado');
    }

    const manutencaoCorretiva = new ManutencoesCorretivas();
    manutencaoCorretiva.data = new Date(createManutencaoCorretivaDto.data);
    manutencaoCorretiva.kmManutencao =
      createManutencaoCorretivaDto.kmManutencao;
    manutencaoCorretiva.kmProximaManutencao =
      createManutencaoCorretivaDto.kmProximaManutencao;
    manutencaoCorretiva.valorTotal = createManutencaoCorretivaDto.valorTotal;
    manutencaoCorretiva.oficinaId = oficina;
    manutencaoCorretiva.veiculoId = veiculo;

    return await this.manutencaoCorretivaRepository.save(manutencaoCorretiva);
  }

  async findAll(): Promise<ManutencoesCorretivas[]> {
    return await this.manutencaoCorretivaRepository.find({
      relations: [
        'veiculoId',
        'oficinaId',
        'pecasTrocadasCorretiva',
        'pecasTrocadasCorretiva.peca',
        'oleoTrocadoCorretiva',
        'oleoTrocadoCorretiva.oleo',
      ],
    });
  }

  async findOne(id: number): Promise<ManutencoesCorretivas> {
    const manutencaoCorretiva =
      await this.manutencaoCorretivaRepository.findOne({
        where: { id },
        relations: [
          'veiculoId',
          'oficinaId',
          'pecasTrocadasCorretiva',
          'pecasTrocadasCorretiva.peca',
          'oleoTrocadoCorretiva',
          'oleoTrocadoCorretiva.oleo', // Inclui a relação com Oleo
        ],
      });
    if (!manutencaoCorretiva) {
      throw new NotFoundException(
        `Manutencao Corretiva with ID ${id} not found`,
      );
    }
    return manutencaoCorretiva;
  }

  async update(
    id: number,
    updateManutencaoCorretivaDto: UpdateManutencaoCorretivaDto,
  ): Promise<ManutencoesCorretivas> {
    const manutencaoCorretiva = await this.findOne(id);

    if (updateManutencaoCorretivaDto.oficinaId) {
      const oficina = await this.oficinaRepository.findOne({
        where: { id: updateManutencaoCorretivaDto.oficinaId },
      });
      if (!oficina) {
        throw new NotFoundException('Oficina não encontrada');
      }
      manutencaoCorretiva.oficinaId = oficina;
    }

    if (updateManutencaoCorretivaDto.veiculoId) {
      const veiculo = await this.veiculoRepository.findOne({
        where: { id: updateManutencaoCorretivaDto.veiculoId },
      });
      if (!veiculo) {
        throw new NotFoundException('Veículo não encontrado');
      }
      manutencaoCorretiva.veiculoId = veiculo;
    }

    if (updateManutencaoCorretivaDto.data)
      manutencaoCorretiva.data = new Date(updateManutencaoCorretivaDto.data);
    if (updateManutencaoCorretivaDto.kmManutencao !== undefined)
      manutencaoCorretiva.kmManutencao =
        updateManutencaoCorretivaDto.kmManutencao;
    if (updateManutencaoCorretivaDto.valorTotal !== undefined)
      manutencaoCorretiva.valorTotal = updateManutencaoCorretivaDto.valorTotal;

    return await this.manutencaoCorretivaRepository.save(manutencaoCorretiva);
  }

  async remove(id: number): Promise<void> {
    const manutencaoCorretiva = await this.findOne(id);
    await this.manutencaoCorretivaRepository.remove(manutencaoCorretiva);
  }
}
