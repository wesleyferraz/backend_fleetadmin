// user-admin.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UsersAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'senha' })
  senha: string;
}
