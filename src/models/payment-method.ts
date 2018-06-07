import { Entity, property, model } from '@loopback/repository';
import { Payment } from '../models/payment';

@model({
    name: "payment-method"
})
export class PaymentMethod extends Entity {
    @property({
        type: 'Payment',
    })
    payment: Payment;

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    getId() {
        return this.id;
    }
}