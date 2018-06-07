import { Entity, property, model } from '@loopback/repository';

@model({
    name: "payment"
})
export class Payment extends Entity {
    @property({
        type: 'string',
        required: true
    })
    name: string;

    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'number',
        required: true
    })
    expiry_day : number;

    @property({
        type: 'number',
        required: true
    })
    expiry_month: number;

    @property({
        type: 'string',
        required: true
    })
    security_code: string;

    getId() {
        return this.id;
    }
}