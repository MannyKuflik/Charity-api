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
import * as bcrypt from 'bcrypt';

export class RegistrationController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) { }

  @post('/registration')
  async registerUser(@requestBody() user: User): Promise<User> {
    if (!user.email || !user.password) {
      throw new HttpErrors.BadRequest('missing data');
    }

    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));

    if (userExists) {
      throw new HttpErrors.BadRequest('user already exists');
    }

    let hashedPassword= await bcrypt.hash(user.password, 10);

    var newUser= new User();
    newUser.firstname= user.firstname;
    newUser.lastname=user.lastname;
    newUser.email=user.email;
    newUser.id=user.id;
    newUser.password= hashedPassword;

    let storedUser = await this.userRepo.create(newUser);
    storedUser.password=""
    return storedUser;
  }
}