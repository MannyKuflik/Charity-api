import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Project } from '../models/project';
import { inject } from '@loopback/core';


export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id
> {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(Project, datasource);
  }
}