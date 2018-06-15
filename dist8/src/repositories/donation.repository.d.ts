import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Donation } from '../models/donation';
export declare class DonationRepository extends DefaultCrudRepository<Donation, typeof Donation.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
