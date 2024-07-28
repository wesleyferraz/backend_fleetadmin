// seguro.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Seguradoras } from 'src/seguradora/entities/seguradora.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Entity()
export class Seguros {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Seguradoras, (seguradora) => seguradora.id)
  @JoinColumn({ name: 'seguradoraId' })
  seguradoraId: Seguradoras;

  @Column({ name: 'numeroContrato' })
  numeroContrato: string;

  @Column({ name: 'dataVencimento', type: 'date' })
  dataVencimento: Date;

  @Column({ name: 'valorMensal', type: 'decimal', precision: 10, scale: 2 })
  valorMensal: number;

  @ManyToOne(() => Veiculos)
  @JoinColumn({ name: 'veiculoId' })
  veiculoId: Veiculos;
}
