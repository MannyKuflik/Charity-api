import { repository } from "@loopback/repository";
import { request } from "http";
import { UserRepository } from "../repositories/user.repository";
import { DonationRepository } from "../repositories/donation.repository";
import { CharityRepository } from "../repositories/charity.repository";
import { post, get, requestBody, param, HttpErrors } from "@loopback/rest";
import { User } from "../models/user";
import { Charity } from "../models/charity";
import { Donation } from "../models/donation";

export class DonationsController {

    constructor(
        @repository(UserRepository) private userRepo: UserRepository,
        @repository(CharityRepository) private charityRepo: CharityRepository,
        @repository(DonationRepository) private donationRepo: DonationRepository) { }

    @post('/donations')
    async makeDonation(@requestBody() donation: Donation): Promise<Donation> {
        if (!(await this.userRepo.count({ id: donation.user_id }))) {
            throw new HttpErrors.Unauthorized('user does not exist');
        }

        if (!(await this.charityRepo.count({ id: donation.charity_id }))) {
            throw new HttpErrors.Unauthorized('charity does not exist');
        }

        if (donation.amount <= 0) {
            throw new HttpErrors.Unauthorized('amount is less than or equal to 0');
        }

        await this.donationRepo.create(donation);
        return donation;
    }

    @get('/charities')
    async findDonations(): Promise<Donation[]> {
        return await this.donationRepo.find();
    }
    @get('/charities/{id}')
    async findDonationsById(@param.path.number('id') id: number): Promise<Donation> {

        let donationExists: boolean = !!(await this.donationRepo.count({ id }));

        if (!donationExists) {
            throw new HttpErrors.BadRequest(`charity ID ${id} does not exist`);
        }

        return await this.donationRepo.findById(id);
    }

    @get('/donations/{userid}')
    async getAllUserCharityNamesAmounts(@param.path.number('userid') userid: number): Promise<Array<string>> {
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

    @get('/donations/names/{userid}')
    async getAllUserCharityNames(@param.path.number('userid') userid: number): Promise<Array<string>> {
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

    @get('/donations/money/{userid}')
    async getAllUserDonationTotal(@param.path.number('userid') userid: number): Promise<number> {
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

    @get('/donations/ids/{userid}')
    async getAllUserCharityids(@param.path.number('userid') userid: number): Promise<Array<number>> {
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

    @get('/donations/num/{userid}')
    async getNumUserCharities(@param.path.number('userid') userid: number): Promise<number> {
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
}