import { UserRepository } from "../repositories/user.repository";
import { DonationRepository } from "../repositories/donation.repository";
import { CharityRepository } from "../repositories/charity.repository";
import { Donation } from "../models/donation";
export declare class DonationsController {
    private userRepo;
    private charityRepo;
    private donationRepo;
    constructor(userRepo: UserRepository, charityRepo: CharityRepository, donationRepo: DonationRepository);
    makeDonation(donation: Donation): Promise<Donation>;
}
