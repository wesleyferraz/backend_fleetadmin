// motorista.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Entity()
export class Motoristas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cpf' })
  cpf: string;

  @Column({ name: 'rg' })
  rg: string;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'sobrenome' })
  sobrenome: string;

  @ManyToOne(() => Enderecos)
  @JoinColumn({ name: 'enderecoId' })
  enderecoId: Enderecos;

  @Column({ name: 'celular' })
  celular: string;

  @Column()
  numeroRegistroCnh: number;

  @Column()
  categoriaCnh: string;

  @Column()
  dataVencimentoCnh: Date;
}
