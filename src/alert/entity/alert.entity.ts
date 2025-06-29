// alert.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  eventDate: Date;

  @Column()
  alertDate: Date;

  @Column()
  email: string;

  @Column({ default: false })
  sent: boolean;

  @ManyToOne(() => Veiculos, { eager: true, nullable: false })
  veiculo: Veiculos;
}
