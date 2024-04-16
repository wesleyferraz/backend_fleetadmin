// seguradora.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Endereco } from 'src/endereco/entities/endereco.entity';

@Entity()
export class Seguradora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cnpj' })
  cnpj: string;

  @Column({ name: 'razaoSocial' })
  razaoSocial: string;

  @OneToOne(() => Endereco)
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;
}
