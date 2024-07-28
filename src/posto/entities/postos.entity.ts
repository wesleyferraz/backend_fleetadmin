// Fornecedor.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Entity()
export class Postos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cnpj' })
  cnpj: string;

  @Column({ name: 'razaoSocial' })
  razaoSocial: string;

  @ManyToOne(() => Enderecos)
  @JoinColumn({ name: 'enderecoId' })
  enderecoId: Enderecos;
}
