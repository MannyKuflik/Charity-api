"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const charity_repository_1 = require("../repositories/charity.repository");
const project_1 = require("../models/project");
const project_repository_1 = require("../repositories/project.repository");
const rest_1 = require("@loopback/rest");
const post_1 = require("../models/post");
const post_repository_1 = require("../repositories/post.repository");
let CharityController = class CharityController {
    constructor(charityRepo, projectRepo, postRepo) {
        this.charityRepo = charityRepo;
        this.projectRepo = projectRepo;
        this.postRepo = postRepo;
    }
    async findCharities() {
        return await this.charityRepo.find();
    }
    async findCharitiesById(id) {
        let charityExists = !!(await this.charityRepo.count({ id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest(`charity ID ${id} does not exist`);
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
    //   return charities;
    // }
    async getAllCharityProjects(id) {
        return await this.projectRepo.find();
    }
    async getCharityProjectByID(id) {
        return new project_1.Project();
    }
    async makeCharityProjectPosts(post) {
        return await this.postRepo.create(post);
    }
};
__decorate([
    rest_1.get('/charities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "findCharities", null);
__decorate([
    rest_1.get('/charities/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "findCharitiesById", null);
__decorate([
    rest_1.get('/charities/{id}/projects'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getAllCharityProjects", null);
__decorate([
    rest_1.get('/charities/{id}/projects/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getCharityProjectByID", null);
__decorate([
    rest_1.post('/charities/{id}/projects/{id}/posts'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_1.Post]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "makeCharityProjectPosts", null);
CharityController = __decorate([
    __param(0, repository_1.repository(charity_repository_1.CharityRepository)),
    __param(1, repository_1.repository(project_repository_1.ProjectRepository)),
    __param(2, repository_1.repository(post_repository_1.PostRepository)),
    __metadata("design:paramtypes", [charity_repository_1.CharityRepository,
        project_repository_1.ProjectRepository,
        post_repository_1.PostRepository])
], CharityController);
exports.CharityController = CharityController;
//# sourceMappingURL=charity.controller.js.map