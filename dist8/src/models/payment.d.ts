import { Entity } from '@loopback/repository';
export declare class Payment extends Entity {
    id?: number;
    full_name: string;
    number: number;
    expday: number;
    expmonth: number;
    expyear: number;
    securitycode: string;
    getId(): number | undefined;
}
