import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
export declare class UsersController {
    private userRepo;
    constructor(userRepo: UserRepository);
    getAllUsers(): Promise<Array<User>>;
    getAllUsersByID(): Promise<Array<User>>;
}
