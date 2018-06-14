import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Charity } from '../models/charity';
export declare class CharityRepository extends DefaultCrudRepository<Charity, typeof Charity.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
