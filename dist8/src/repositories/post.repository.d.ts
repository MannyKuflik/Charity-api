import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Post } from '../models/post';
export declare class PostRepository extends DefaultCrudRepository<Post, typeof Post.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
