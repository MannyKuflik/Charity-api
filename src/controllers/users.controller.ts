import { repository } from '@loopback/repository';
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { HttpErrors, get, param } from '@loopback/rest';
import { sign, verify } from'jsonwebtoken';
import { Token } from 'marked';

export class UserController {
    constructor(
        @repository(UserRepository) protected userRepo: UserRepository,
    ) { }

    @get('/users')
    async getAllUsers(@param.query.string('jwt') jwt: string): Promise<Array<User>>
   /*  async findUsers(): Promise<User[]> */ {
    if (!jwt) {
        throw new HttpErrors.Unauthorized("Jwt not valid");
    }    
    try {
        verify(jwt, 'shh');
        return await this.userRepo.find();
    } catch (err) {
        throw new HttpErrors.BadRequest("Jwt not verifiable");
    }
    }

    @get('/users/{id}')
    async findUsersById(@param.path.number('id') id: number): Promise<User> {

        let userExists: boolean = !!(await this.userRepo.count({ id }));

        if (!userExists) {
            throw new HttpErrors.BadRequest(`user ID ${id} does not exist`);
        }

        return await this.userRepo.findById(id);
    }
    @get('/users/{user_id}/donations')
    async getDonationsByUserId(
        @param.path.number('user_id') userId: number,
        @param.query.date('date_from') dateFrom: Date,
        @param.header.string('Authorization') authorizationToken: String
    ) {
        // Some awesome logic down here...
    }
}