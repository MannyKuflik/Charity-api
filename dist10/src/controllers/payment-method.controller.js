"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const donation_repository_1 = require("../repositories/donation.repository");
const payment_method_repository_1 = require("../repositories/payment-method.repository");
const rest_1 = require("@loopback/rest");
const payment_method_1 = require("../models/payment-method");
let PaymentMethodsController = class PaymentMethodsController {
    constructor(paymentMethodRepo) {
        this.paymentMethodRepo = paymentMethodRepo;
    }
    async getPaymentMethod() {
        return await this.paymentMethodRepo.find();
    }
    async makePaymentMethod(payment_method) {
    }
};
__decorate([
    rest_1.get('/payment-methods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "getPaymentMethod", null);
__decorate([
    rest_1.post('/payment-methods'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_method_1.PaymentMethod]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "makePaymentMethod", null);
PaymentMethodsController = __decorate([
    __param(0, repository_1.repository(donation_repository_1.DonationRepository.name)),
    __metadata("design:paramtypes", [payment_method_repository_1.PaymentMethodRepository])
], PaymentMethodsController);
exports.PaymentMethodsController = PaymentMethodsController;
//# sourceMappingURL=payment-method.controller.js.map