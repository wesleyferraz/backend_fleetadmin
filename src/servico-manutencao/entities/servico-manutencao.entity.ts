// servico-manutencao.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ServicoManutencao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'descricao' })
  descricao: string;
}
