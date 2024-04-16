// manutencao-preventiva.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Oficina } from 'src/oficina/entities/oficina.entity';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';

@Entity()
export class ManutencaoPreventiva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'data', type: 'date' })
  data: Date;

  @Column({ name: 'kmManutencao', type: 'int' })
  kmManutencao: number;

  @Column({ name: 'kmProximaManutencao', type: 'int' })
  kmProximaManutencao: number;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @ManyToOne(() => Oficina, (oficina) => oficina.id)
  oficina: Oficina;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.id)
  veiculo: Veiculo;
}
