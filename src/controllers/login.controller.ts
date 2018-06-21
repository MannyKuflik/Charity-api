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
  var users = await this.userRepo.find();

  var email = user.email;
  var password = user.password;

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    let check = await bcrypt.compare(password, user.password)
    console.log(check);
    if (user.email == email && check) {

      var jwt = sign(
        {
          user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          },
          anything: "hello"
        },
        'shh', 
        {
          issuer: 'auth.ix.co.za',
          audience: 'ix.co.za',
          expiresIn: '24hr',
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