import { repository } from '@loopback/repository';
import { CharityRepository } from "../repositories/charity.repository";
import { Charity } from "../models/charity";
import { Project } from "../models/project";
import { ProjectRepository } from "../repositories/project.repository"
import { post, get, requestBody, param, HttpErrors } from "@loopback/rest";
import { Post } from "../models/post";
import { PostRepository } from "../repositories/post.repository"


export class CharityController {
  constructor(
    @repository(CharityRepository) protected charityRepo: CharityRepository, 
    @repository(ProjectRepository) protected projectRepo: ProjectRepository, 
    @repository(PostRepository) protected postRepo: PostRepository
  ) { }

  @get('/charities')
  async findCharities(): Promise<Charity[]> {
    return await this.charityRepo.find();
  }

  @get('/charities/{id}')
  async findCharitiesById(@param.path.number('id') id: number): Promise<Charity> {

    let charityExists: boolean = !!(await this.charityRepo.count({ id }));

    if (!charityExists) {
      throw new HttpErrors.BadRequest(`charity ID ${id} does not exist`);
    }

    return await this.charityRepo.findById(id);
  }

  // @get('/charities/user/{userid}')
  // async getAllUserCharities(@param.path.number('userid') userid: number): Promise<Array<Charity>> {
  //   var charities = new Array();
  //   var arr = await this.findCharities();
  //   var l = arr.length + 1;
  //   for (var i = 1; i < l; i++) {
  //  var char = await this.findCharitiesById(i)
  //  if (userid == char.id){
  //    charities.push(char);
  //     }
  //   }
  //   return await charities;
  // }

  @get('/charities/{id}/projects')
  async getAllCharityProjects(@param.path.number('id') id: number): Promise<Array<Project>> {
    return await this.projectRepo.find();
  }


  @get('/charities/{id}/projects/{id}')
  async getCharityProjectByID(@param.path.number('id') id: number): Promise<Project> {
    return new Project();
  }

  @post('/charities/{id}/projects/{id}/posts')
  async makeCharityProjectPosts(@requestBody() post: Post): Promise<Post> {
    return await this.postRepo.create(post);

  }
}