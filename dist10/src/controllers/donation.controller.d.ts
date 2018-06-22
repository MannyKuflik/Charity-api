import { UserRepository } from "../repositories/user.repository";
import { DonationRepository } from "../repositories/donation.repository";
import { CharityRepository } from "../repositories/charity.repository";
import { Donation } from "../models/donation";
export declare class DonationsController {
    private userRepo;
    private charityRepo;
    private donationRepo;
    constructor(userRepo: UserRepository, charityRepo: CharityRepository, donationRepo: DonationRepository);
    makeDonation(donation: Donation): Promise<void>;
    findDonations(): Promise<Donation[]>;
    findDonationsById(id: number): Promise<Donation>;
    getAllUserCharityNamesAmounts(userid: number): Promise<Array<string>>;
    getAllUserCharityNames(userid: number): Promise<Array<string>>;
    getAllUserDonationTotal(userid: number): Promise<number>;
    getAllUserCharityids(userid: number): Promise<Array<number>>;
    getAllUserCharityAmounts(uid: number): Promise<Array<number>>;
    getNumUserCharities(userid: number): Promise<number>;
}
