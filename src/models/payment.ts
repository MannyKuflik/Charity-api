import { Entity, property, model } from '@loopback/repository';

@model({
    name: "payment"
})
export class Payment extends Entity {
    @property({
        type: 'number',
        id: true
    })
    id?: number;

    @property({
        type: 'string',
        required: true
    })
    full_name: string;

    @property({
        type: 'number',
        required: true
    })
    number: number;
    
    @property({
        type: 'number',
        required: true
    })
    expday : number;

    @property({
        type: 'number',
        required: true
    })
    expmonth: number;

    @property({
        type: 'number',
        required: true
    })
    expyear: number;

    @property({
        type: 'string',
        required: true
    })
    securitycode: string;

    getId() {
        return this.id;
    }
}