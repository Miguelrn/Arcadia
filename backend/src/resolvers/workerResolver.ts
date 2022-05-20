import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { fetch } from 'apollo-server-env';
import { Worker } from '../entity/Worker';
import { isAuth } from '../isAuthMiddleware';
import { Company } from '../entity/Company';


@Resolver()
export class WorkerResolver {
    /**
     * Actual list of all the users enabled
     * @returns List of users
     */
    @Query(() => [Worker])
    @UseMiddleware(isAuth)
    async workers(): Promise<Worker[]> {
        return await Worker.find({ where: { disabled: false } });
    }

    /**
     * Actual list of all the users enabled & without company
     * @returns List of users
     */
    @Query(() => [Worker])
    @UseMiddleware(isAuth)
    async joblessWorkers(): Promise<Worker[]> {
        return await Worker.find({ where: { disabled: false, company: undefined} });
    }

    /**
     * Function in char of creation a random user, the info its extracted from https://random-data-api.com/api/users/random_user
     * will check for no duplicate email user-id in case there is a chance of this happening.
     * @returns random worker that has been created
     */
    @Mutation(() => Worker)
    @UseMiddleware(isAuth)
    async createWorker(): Promise<Worker> {
        let validUser = false;
        let worker = null;

        while(!validUser) {
            worker = await fetch('https://random-data-api.com/api/users/random_user', {})
            .then(res => res.json())
            .catch(e => console.log(e))

            const user = await Worker.findOne({ where: [{ id: worker.id }, {email: worker.email}, {username: worker.username}] });
            if (!user) validUser = true;
        }

        const newWorker = await Worker.create({
            id: worker.id,
            username: worker.username,
            name: worker.first_name,
            surname: worker.last_name,
            email: worker.email,
            avatar: worker.avatar.split('?')[0],
            gender: worker.gender,
            phone: worker.phone_number, // +213 1-616-887-6571 x2836
            birthdate: new Date(worker.date_of_birth),
        });

        newWorker.others = {
            "social_insurance_number": worker.social_insurance_number,
            "address": worker.address, 
            "credit_card": worker.credit_card,
            "subscription": worker.subscription
        }

        await newWorker.save();

        return newWorker;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async asignCompany(
        @Arg("userId", () => Number) userId: number,
        @Arg("companyId", () => Number) companyId: number,
    ): Promise<boolean> {
        const user = await Worker.findOne({ where: { id: userId }, relations: ['company'] });
        const project = await Company.findOne({ where: { id: companyId }, relations: ['workers'] });
        if (!user || !project) throw new Error('User or company does not exits');

        if(user.company !== null) throw new Error('User already have a job, please leave your actual job before join a new company!')

        project.workers?.push(user); 
        await project.save();
        return true;
    }

}