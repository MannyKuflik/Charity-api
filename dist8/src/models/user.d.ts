import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id?: number;
    firstname: number;
    lastname: number;
    dob: string;
    email: string;
    password: string;
    getId(): number | undefined;
}
