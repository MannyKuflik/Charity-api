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
const user_repository_1 = require("../repositories/user.repository");
const donation_repository_1 = require("../repositories/donation.repository");
const charity_repository_1 = require("../repositories/charity.repository");
const rest_1 = require("@loopback/rest");
const donation_1 = require("../models/donation");
let DonationsController = class DonationsController {
    constructor(userRepo, charityRepo, donationRepo) {
        this.userRepo = userRepo;
        this.charityRepo = charityRepo;
        this.donationRepo = donationRepo;
    }
    async makeDonation(donation) {
        if (!(await this.userRepo.count({ id: donation.user.getId() }))) {
            throw new rest_1.HttpErrors.Unauthorized('user does not exist');
        }
        if (!(await this.charityRepo.count({ id: donation.charity.getId() }))) {
            throw new rest_1.HttpErrors.Unauthorized('charity does not exist');
        }
        if (donation.amount <= 0) {
            throw new rest_1.HttpErrors.Unauthorized('amount is less than or equal to 0');
        }
        return await this.donationRepo.create(donation);
    }
};
__decorate([
    rest_1.post('/donations'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donation_1.Donation]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "makeDonation", null);
DonationsController = __decorate([
    __param(0, repository_1.repository(donation_repository_1.DonationRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, charity_repository_1.CharityRepository, donation_repository_1.DonationRepository])
], DonationsController);
exports.DonationsController = DonationsController;
//# sourceMappingURL=donation.controller.js.map