import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id?: number;
    firstname: number;
    lastname: number;
    email: string;
    password: string;
    getId(): number | undefined;
}
