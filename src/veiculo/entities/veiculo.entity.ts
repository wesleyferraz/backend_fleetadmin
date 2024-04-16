// veiculo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'placa' })
  placa: string;

  @Column({ name: 'chassi' })
  chassi: string;

  @Column({ name: 'modelo' })
  modelo: string;

  @Column({ name: 'marca' })
  marca: string;

  @Column({ name: 'cor' })
  cor: string;

  @Column({ name: 'anoFabricacao' })
  anoFabricacao: number;

  @Column({ name: 'anoModelo' })
  anoModelo: number;

  @Column({ name: 'dataVencimentoLicenciamento', type: 'date' })
  dataVencimentoLicenciamento: Date;

  @Column({ name: 'cargaMaxima', type: 'decimal', precision: 10, scale: 2 })
  cargaMaxima: number;
}
