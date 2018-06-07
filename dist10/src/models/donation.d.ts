import { Entity } from '@loopback/repository';
export declare class Donation extends Entity {
    id?: number;
    amount: number;
    user_id: number;
    charity_id: number;
    getId(): number | undefined;
}
