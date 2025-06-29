import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Motoristas } from 'src/motorista/entities/motorista.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Entity()
export class Viagem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fornecedor)
  @JoinColumn({ name: 'fornecedorId' })
  fornecedor: Fornecedor;

  @Column()
  notaFiscal: string;

  @Column()
  origem: string;

  @Column()
  destino: string;

  @Column()
  dataCarregamento: Date;

  @Column()
  dataDescarregamento: Date;

  @Column({ name: 'valorUnitario', type: 'decimal', precision: 10, scale: 2 })
  valorUnitario: number;

  @Column({ name: 'valorTotal', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  @Column({
    name: 'volumeTransportado',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  volumeTransportado: number;

  @Column({
    name: 'remuneracaoMotorista',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  remuneracaoMotorista: number;

  @ManyToOne(() => Motoristas)
  @JoinColumn({ name: 'motoristaId' })
  motorista: Motoristas;

  @ManyToOne(() => Veiculos)
  @JoinColumn({ name: 'veiculoId' })
  veiculo: Veiculos;
}
