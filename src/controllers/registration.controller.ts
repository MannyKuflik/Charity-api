/* import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { post, get, requestBody } from "@loopback/rest";
import { User } from "../models/user";

export class RegistrationController {

  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) {}

  @post('/registration')
  async createUser(@requestBody() user: User) {
    return await this.userRepo.create(user);
  }
} */

import { repository } from '@loopback/repository';
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { HttpErrors, post, requestBody } from '@loopback/rest';

export class RegistrationController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) {}

  @post('/registration')
  async registerUser(@requestBody() user: User): Promise<User> {
    // Check that required fields are supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.BadRequest('missing data');
    }

    // Check that user does not already exist
    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));

    if (userExists) {
      throw new HttpErrors.BadRequest('user already exists');
    }

    return await this.userRepo.create(user);
  }
}