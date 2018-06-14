import { Entity } from '@loopback/repository';
export declare class Payment extends Entity {
    name: string;
    id?: number;
    expiry_day: number;
    expiry_month: number;
    security_code: string;
    getId(): number | undefined;
}
