import { Postos } from 'src/posto/entities/postos.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Combustivel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo' })
  tipo: string;

  @Column({ name: 'volume' })
  volume: number;

  @Column({ name: 'valor_unitario', type: 'decimal', precision: 10, scale: 2 })
  valor_unitario: number;

  @Column({ name: 'valor_total', type: 'decimal', precision: 10, scale: 2 })
  valor_total: number;

  @Column({ name: 'data' })
  data: Date;

  @ManyToOne(() => Veiculos)
  @JoinColumn({ name: 'veiculo_id' })
  veiculo: Veiculos;

  @ManyToOne(() => Postos)
  @JoinColumn({ name: 'posto_id' })
  posto: Postos;
}
