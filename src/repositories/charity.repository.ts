import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Charity } from '../models/charity';
import { inject } from '@loopback/core';

export class CharityRepository extends DefaultCrudRepository<
  Charity,
  typeof Charity.prototype.id
> {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(Charity, datasource);
  }
}