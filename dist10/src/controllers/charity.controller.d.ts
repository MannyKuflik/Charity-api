import { CharityRepository } from "../repositories/charity.repository";
import { Charity } from "../models/charity";
import { Project } from "../models/project";
import { ProjectRepository } from "../repositories/project.repository";
import { Post } from "../models/post";
import { PostRepository } from "../repositories/post.repository";
export declare class CharityController {
    protected charityRepo: CharityRepository;
    protected projectRepo: ProjectRepository;
    protected postRepo: PostRepository;
    constructor(charityRepo: CharityRepository, projectRepo: ProjectRepository, postRepo: PostRepository);
    findCharities(): Promise<Charity[]>;
    findCharitiesById(id: number): Promise<Charity>;
    getAllCharityProjects(id: number): Promise<Array<Project>>;
    getCharityProjectByID(id: number): Promise<Project>;
    makeCharityProjectPosts(post: Post): Promise<Post>;
}
