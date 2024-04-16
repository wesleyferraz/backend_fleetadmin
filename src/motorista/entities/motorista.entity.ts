// motorista.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Endereco } from 'src/endereco/entities/endereco.entity';

@Entity()
export class Motorista {
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

  @OneToOne(() => Endereco)
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;

  @Column({ name: 'celular' })
  celular: string;

  @Column({ name: 'foto_path', nullable: true })
  fotoPath: string;

  @Column({ name: 'certificacoes_id' })
  certificacoesId: string;
}
