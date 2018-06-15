import { repository } from '@loopback/repository';
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { HttpErrors, get, param, put, requestBody } from '@loopback/rest';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

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

    // @put('/users/{user_id}/settings')
    // async updateUsersInfo(@requestBody() user: User): Promise<User> {
    //     var users = await this.userRepo.find();

    //     var email = user.email;
    //     var password = user.password;

    //     for (var i = 0; i < users.length; i++) {
    //         var user = users[i];
    //         if (user.email == email && bcrypt.compare(password, user.password)) {

    //             var jwt = sign(
    //                 {
    //                     user: {
    //                         id: user.id,
    //                         firstname: user.firstname,
    //                         lastname: user.lastname,
    //                         email: user.email
    //                     },
    //                     anything: "hello"
    //                 },
    //                 'shh',
    //                 {
    //                     issuer: 'auth.ix.co.za',
    //                     audience: 'ix.co.za',
    //                     expiresIn: '24hr',
    //                 },
    //             );

    //             return {
    //                 token: jwt,
    //                 firstname: user.firstname,
    //             };
    //         }
    //     }

    //     throw new HttpErrors.Unauthorized('User not found, sorry!');
    //     //return "Error";
    // }
}