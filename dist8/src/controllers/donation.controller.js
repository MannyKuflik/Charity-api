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
        // if (!(await this.userRepo.count({ id: donation.user.getId() }))) {
        //     throw new HttpErrors.Unauthorized('user does not exist');
        // }
        // if (!(await this.charityRepo.count({ id: donation.charity.getId() }))) {
        //     throw new HttpErrors.Unauthorized('charity does not exist');
        // }
        if (!(await this.userRepo.count({ id: donation.user_id }))) {
            throw new rest_1.HttpErrors.Unauthorized('user does not exist');
        }
        if (!(await this.charityRepo.count({ id: donation.charity_id }))) {
            throw new rest_1.HttpErrors.Unauthorized('charity does not exist');
        }
        if (donation.amount <= 0) {
            throw new rest_1.HttpErrors.Unauthorized('amount is less than or equal to 0');
        }
        await this.donationRepo.create(donation);
        return donation;
    }
    async findDonations() {
        return await this.donationRepo.find();
    }
    async findDonationsById(id) {
        let donationExists = !!(await this.donationRepo.count({ id }));
        if (!donationExists) {
            throw new rest_1.HttpErrors.BadRequest(`charity ID ${id} does not exist`);
        }
        return await this.donationRepo.findById(id);
    }
    async getAllUserCharityNamesAmounts(userid) {
        var ids = new Array();
        var charities = new Array();
        var arr = await this.findDonations();
        var l = arr.length + 1;
        for (var i = 1; i < l; i++) {
            var donation = await this.donationRepo.findById(i);
            if (userid == donation.user_id) {
                if (!ids.includes(donation.charity_id)) {
                    ids.push(donation.charity_id);
                    charities.push("Donated " + donation.amount + " dollars to " + donation.charity_name +
                        "          ");
                }
            }
        }
        return charities;
    }
    async getAllUserCharityNames(userid) {
        var ids = new Array();
        var charities = new Array();
        var arr = await this.findDonations();
        var l = arr.length + 1;
        for (var i = 1; i < l; i++) {
            var donation = await this.donationRepo.findById(i);
            if (userid == donation.user_id) {
                if (!ids.includes(donation.charity_id)) {
                    ids.push(donation.charity_id);
                    charities.push(donation.charity_name +
                        " ");
                }
            }
        }
        return charities;
    }
    async getAllUserDonationTotal(userid) {
        var total = 0;
        var arr = await this.findDonations();
        var l = arr.length + 1;
        for (var i = 1; i < l; i++) {
            var donation = await this.donationRepo.findById(i);
            if (userid == donation.user_id) {
                total += donation.amount;
            }
        }
        return total;
    }
    async getAllUserCharityids(userid) {
        var ids = new Array();
        var arr = await this.findDonations();
        var l = arr.length + 1;
        for (var i = 1; i < l; i++) {
            var donation = await this.donationRepo.findById(i);
            if (userid == donation.user_id) {
                if (!ids.includes(donation.charity_id)) {
                    ids.push(donation.charity_id);
                }
            }
        }
        return ids;
    }
    async getNumUserCharities(userid) {
        var ids = new Array();
        var arr = await this.findDonations();
        var l = arr.length + 1;
        for (var i = 1; i < l; i++) {
            var donation = await this.donationRepo.findById(i);
            if (userid == donation.user_id) {
                if (!ids.includes(donation.charity_id)) {
                    ids.push(donation.charity_id);
                }
            }
        }
        return ids.length;
    }
};
__decorate([
    rest_1.post('/donations'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donation_1.Donation]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "makeDonation", null);
__decorate([
    rest_1.get('/charities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "findDonations", null);
__decorate([
    rest_1.get('/charities/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "findDonationsById", null);
__decorate([
    rest_1.get('/donations/{userid}'),
    __param(0, rest_1.param.path.number('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getAllUserCharityNamesAmounts", null);
__decorate([
    rest_1.get('/donations/names/{userid}'),
    __param(0, rest_1.param.path.number('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getAllUserCharityNames", null);
__decorate([
    rest_1.get('/donations/money/{userid}'),
    __param(0, rest_1.param.path.number('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getAllUserDonationTotal", null);
__decorate([
    rest_1.get('/donations/ids/{userid}'),
    __param(0, rest_1.param.path.number('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getAllUserCharityids", null);
__decorate([
    rest_1.get('/donations/num/{userid}'),
    __param(0, rest_1.param.path.number('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getNumUserCharities", null);
DonationsController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository)),
    __param(1, repository_1.repository(charity_repository_1.CharityRepository)),
    __param(2, repository_1.repository(donation_repository_1.DonationRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        charity_repository_1.CharityRepository,
        donation_repository_1.DonationRepository])
], DonationsController);
exports.DonationsController = DonationsController;
//# sourceMappingURL=donation.controller.js.map