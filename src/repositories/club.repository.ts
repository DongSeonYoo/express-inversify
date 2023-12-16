import { inject, injectable } from 'inversify';
import { ClubModule, Database } from '../configs/inversify/types';
import { DataSource, Repository } from 'typeorm';
import { Club } from '../entities/club.entity';

@injectable()
export class ClubRepository {
    private readonly repository: Repository<Club>;
    constructor(@inject(Database.DataSource) private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(Club);
    }
}
