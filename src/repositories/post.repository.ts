import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Post } from '../models/post';
import { inject } from '@loopback/core';


export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id
> {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(Post, datasource);
  }
}