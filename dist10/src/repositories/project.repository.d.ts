import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Project } from '../models/project';
export declare class ProjectRepository extends DefaultCrudRepository<Project, typeof Project.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
