import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { HttpErrors, post, requestBody } from '@loopback/rest';
import {sign, verify} from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class LoginController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) {}

  @post('/login')
  async loginUser(@requestBody() user: User): Promise<any> {
    /* // Check that email and password are both supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email },
        { password: user.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    return await this.userRepo.findOne({
      where: {
        and: [
          { email: user.email },
          { password: user.password }
        ],
      },
    });
  } */
  var users = await this.userRepo.find();

  var email = user.email;
  var password = user.password;

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.email == email && bcrypt.compare(password, user.password)) {

      var jwt = sign(
        {
          user: {
            id: user.id,
            firstname: user.firstname,
            email: user.email
          },
          anything: "hello"
        },
        'shh',
        {
          issuer: 'auth.ix.co.za',
          audience: 'ix.co.za',
        },
      );
      
      return {
        token: jwt,
        firstname: user.firstname,
      };
    }
  }

  throw new HttpErrors.Unauthorized('User not found, sorry!');
  //return "Error";
}
}