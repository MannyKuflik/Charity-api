import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Donation } from '../models/donation';
import { PaymentMethod } from '../models/payment-method';

export class PaymentMethodRepository extends DefaultCrudRepository<
    PaymentMethod,
    typeof PaymentMethod.prototype.id
    > {
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(PaymentMethod, datasource);
    }
}