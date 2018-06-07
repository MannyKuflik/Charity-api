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
        @repository(DonationRepository.name) private userRepo: UserRepository, private charityRepo: CharityRepository, private donationRepo: DonationRepository
    ) { }

    @post('/donations')
    async makeDonation(@requestBody() donation: Donation) {
        if (!(await this.userRepo.count({ id: donation.user.getId() }))) {
            throw new HttpErrors.Unauthorized('user does not exist');
        }

        if (!(await this.charityRepo.count({ id: donation.charity.getId() }))) {
            throw new HttpErrors.Unauthorized('charity does not exist');
        }

        if( donation.amount <= 0 ) {
            throw new HttpErrors.Unauthorized('amount is less than or equal to 0');
        }

        return await this.donationRepo.create(donation);
    }
}