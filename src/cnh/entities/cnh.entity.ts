// cnh.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Motorista } from 'src/motorista/entities/motorista.entity';

@Entity()
export class CNH {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numeroRegistroCnh' })
  numeroRegistroCnh: string;

  @Column({ name: 'categoriaCnh' })
  categoriaCnh: string;

  @Column({ name: 'dataVencimentoCnh', type: 'date' })
  dataVencimentoCnh: Date;

  @OneToOne(() => Motorista, (motorista) => motorista.cpf)
  motorista: Motorista;
}
