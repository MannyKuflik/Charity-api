import { PaymentMethodRepository } from "../repositories/payment-method.repository";
import { PaymentMethod } from "../models/payment-method";
export declare class PaymentMethodsController {
    private paymentMethodRepo;
    constructor(paymentMethodRepo: PaymentMethodRepository);
    getPaymentMethod(): Promise<Array<PaymentMethod>>;
    makePaymentMethod(payment_method: PaymentMethod): Promise<void>;
}
