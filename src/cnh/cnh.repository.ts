import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import { CNH } from './entities/cnh.entity';

@EntityRepository()
export class CnhRepository extends Repository<CNH> {}
