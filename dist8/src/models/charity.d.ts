import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: number;
    slogan: number;
    email: string;
    phonenumber: string;
    getId(): number | undefined;
}
