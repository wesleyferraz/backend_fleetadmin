import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Pneu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'marca' })
  marca: string;

  @Column({ name: 'tipo' })
  tipo: string;

  @Column({ name: 'tipo_de_borracha' })
  tipo_de_borracha: string;

  @Column({ name: 'recapagem' })
  recapagem: number;

  @Column({ name: 'local_de_instalacao' })
  local_de_instalacao: string;

  @Column({ name: 'referencia' })
  referencia: string;

  @Column({ name: 'posicao' })
  posicao: number;

  @ManyToOne(() => Veiculos)
  @JoinColumn({ name: 'veiculoId' })
  veiculo: Veiculos;
}
