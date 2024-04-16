// seguro.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Seguradora } from 'src/seguradora/entities/seguradora.entity';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';

@Entity()
export class Seguro {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Seguradora, (seguradora) => seguradora.id)
  @JoinColumn({ name: 'seguradora_id' })
  seguradora: Seguradora;

  @Column({ name: 'numeroContrato' })
  numeroContrato: string;

  @Column({ name: 'dataVencimento', type: 'date' })
  dataVencimento: Date;

  @Column({ name: 'valorMensal', type: 'decimal', precision: 10, scale: 2 })
  valorMensal: number;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.id)
  @JoinColumn({ name: 'veiculo_id' })
  veiculo: Veiculo;
}
