import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { PaymentMethod } from '../models/payment-method';
export declare class PaymentMethodRepository extends DefaultCrudRepository<PaymentMethod, typeof PaymentMethod.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
