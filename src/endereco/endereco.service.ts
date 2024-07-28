import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enderecos } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import axios from 'axios';
import { error } from 'console';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Enderecos)
    private readonly enderecoRepository: Repository<Enderecos>,
  ) {}

  async create(createEnderecoDto: CreateEnderecoDto): Promise<Enderecos> {
    const newEndereco = this.enderecoRepository.create(createEnderecoDto);
    return await this.enderecoRepository.save(newEndereco);
  }

  async findAll(): Promise<Enderecos[]> {
    return await this.enderecoRepository.find();
  }

  async findOne(id: number): Promise<Enderecos> {
    const endereco = await this.enderecoRepository.findOneBy({ id });
    if (!endereco) {
      throw new NotFoundException(`Endereco with ID ${id} not found`);
    }
    return endereco;
  }

  async update(
    id: number,
    updateEnderecoDto: UpdateEnderecoDto,
  ): Promise<Enderecos> {
    const endereco = await this.findOne(id);
    this.enderecoRepository.merge(endereco, updateEnderecoDto);
    return await this.enderecoRepository.save(endereco);
  }

  async remove(id: number): Promise<void> {
    const endereco = await this.findOne(id);
    await this.enderecoRepository.remove(endereco);
  }

  // Função para obter o nome completo da UF a partir da sigla
  obterNomeUF(sigla: string): string {
    const ufs: { [key: string]: string } = {
      AC: 'Acre',
      AL: 'Alagoas',
      AP: 'Amapá',
      AM: 'Amazonas',
      BA: 'Bahia',
      CE: 'Ceará',
      DF: 'Distrito Federal',
      ES: 'Espírito Santo',
      GO: 'Goiás',
      MA: 'Maranhão',
      MT: 'Mato Grosso',
      MS: 'Mato Grosso do Sul',
      MG: 'Minas Gerais',
      PA: 'Pará',
      PB: 'Paraíba',
      PR: 'Paraná',
      PE: 'Pernambuco',
      PI: 'Piauí',
      RJ: 'Rio de Janeiro',
      RN: 'Rio Grande do Norte',
      RS: 'Rio Grande do Sul',
      RO: 'Rondônia',
      RR: 'Roraima',
      SC: 'Santa Catarina',
      SP: 'São Paulo',
      SE: 'Sergipe',
      TO: 'Tocantins',
    };
    return ufs[sigla] || '';
  }

  async consultarCEP(cep: number): Promise<any> {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      // Substituir a sigla da UF pelo nome completo
      data.uf = this.obterNomeUF(data.uf);
      if (data?.erro) {
        return new HttpException('Cep não encontrado', 404);
      }
      return data;
    } catch (error) {
      throw new Error('CEP not found');
    }
  }
}
