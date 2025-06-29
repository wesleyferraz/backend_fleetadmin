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
export class Abastecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo' })
  tipo: string;

  @Column({ name: 'volume', type: 'decimal', precision: 15, scale: 9 })
  volume: number;

  @Column({ name: 'valor_unitario', type: 'decimal', precision: 15, scale: 9 })
  valor_unitario: number;

  @Column({ name: 'valor_total', type: 'decimal', precision: 15, scale: 9 })
  valor_total: number;

  @Column({ name: 'km_inicial', type: 'decimal', precision: 15, scale: 9 })
  km_inicial: number;

  @Column({ name: 'km_final', type: 'decimal', precision: 15, scale: 9 })
  km_final: number;

  @Column({ name: 'consumo', type: 'decimal', precision: 15, scale: 9 })
  consumo: number;

  @Column({ name: 'data' })
  data: Date;

  @ManyToOne(() => Veiculos)
  @JoinColumn({ name: 'veiculo_id' })
  veiculo: Veiculos;

  @ManyToOne(() => Postos)
  @JoinColumn({ name: 'posto_id' })
  posto: Postos;
}
