import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
export declare class UserController {
    protected userRepo: UserRepository;
    constructor(userRepo: UserRepository);
    getAllUsers(jwt: string): Promise<Array<User>>;
    findUsersById(id: number): Promise<User>;
    getDonationsByUserId(userId: number, dateFrom: Date, authorizationToken: String): Promise<void>;
}
