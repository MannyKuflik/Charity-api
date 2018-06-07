import { Entity } from '@loopback/repository';
export declare class PaymentMethod extends Entity {
    payment_id: number;
    id?: number;
    getId(): number | undefined;
}
