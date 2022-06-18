import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { fetch } from 'apollo-server-env';
import { Worker } from '../entity/Worker';
import { isAuth } from '../isAuthMiddleware';
import { Company } from '../entity/Company';
import moment from 'moment';

@Resolver()
export class WorkerResolver {
	/**
	 * Actual list of all the users enabled
	 * @returns List of users
	 */
	@Query(() => [Worker])
	@UseMiddleware(isAuth)
	async workers(): Promise<Worker[]> {
		return await Worker.find({
			where: { disabled: false },
			relations: ['company'],
		});
	}

	/**
	 * Find worker by its id
	 * @returns worker
	 */
	@Query(() => Worker, { nullable: true })
	@UseMiddleware(isAuth)
	async workerById(@Arg('workerId', () => Number) workerId: number): Promise<Worker | null> {
		return await Worker.findOne({
			where: { id: workerId, disabled: false },
			relations: ['company', 'company.workers'],
		});
	}

	/**
	 * Actual list of all the users enabled & without company
	 * @returns List of users
	 */
	@Query(() => [Worker])
	@UseMiddleware(isAuth)
	async joblessWorkers(): Promise<Worker[]> {
		return await Worker.find({
			where: { disabled: false, company: undefined },
		});
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

		while (!validUser) {
			worker = await fetch('https://random-data-api.com/api/users/random_user', {})
				.then(res => res.json())
				.catch(e => console.log(e));

			const user = await Worker.findOne({
				where: [{ id: worker.id }, { email: worker.email }, { username: worker.username }],
			});
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
			social_insurance_number: worker.social_insurance_number,
			address: worker.address,
			credit_card: worker.credit_card,
			subscription: worker.subscription,
		};

		await newWorker.save();

		return newWorker;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async asignCompany(
		@Arg('userId', () => Number) userId: number,
		@Arg('companyId', () => Number) companyId: number
	): Promise<boolean> {
		const user = await Worker.findOne({
			where: { id: userId },
			relations: ['company'],
		});
		const company = await Company.findOne({
			where: { id: companyId },
			relations: ['workers'],
		});
		if (!user || !company) throw new Error('User or company does not exits');

		if (user.company !== null)
			throw new Error('User already have a job, please leave your actual job before join a new company!');

		company.workers?.push(user);
		await company.save();
		return true;
	}

	/**
	 * Update fields of a given worker
	 * @param workerId
	 * @param username
	 * @param name
	 * @param surname
	 * @param email
	 * @param avatar
	 * @param gender
	 * @param phone
	 * @param birthdate
	 * @param others
	 * @returns
	 */
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async updateWorker(
		@Arg('workerId', () => Number) workerId: number,
		@Arg('username', () => String) username: string,
		@Arg('name', () => String) name: string,
		@Arg('surname', () => String) surname: string,
		@Arg('email', () => String) email: string,
		@Arg('avatar', () => String) avatar: string,
		@Arg('gender', () => String) gender: string,
		@Arg('phone', () => String) phone: string,
		@Arg('birthdate', () => String) birthdate: string,
		@Arg('others', () => String) others: string
	): Promise<boolean> {
		const user = await Worker.findOne({
			where: { id: workerId },
			relations: ['company'],
		});
		if (!user) throw new Error('User does not exits');

		user.username = username;
		user.name = name;
		user.surname = surname;
		user.email = email;
		user.avatar = avatar;
		user.gender = gender;
		user.phone = phone;
		user.birthdate = moment(birthdate, 'YYYY/MM/DD').toDate();
		user.others = JSON.parse(others);

		await user.save();
		return true;
	}

	/**
	 * logical deletion
	 * @param workerId worker id
	 * @returns
	 */
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async disableWorker(@Arg('workerId', () => Number) workerId: number): Promise<boolean> {
		const user = await Worker.findOne({ where: { id: workerId } });
		if (!user) throw new Error('User does not exits');

		user.disabled = true;

		await user.save();
		return true;
	}

	/**
	 * remove company of user
	 * @param workerId worker id
	 * @param companyId company id
	 * @returns
	 */
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async deleteJob(
		@Arg('workerId', () => Number) workerId: number,
		@Arg('companyId', () => Number) companyId: number
	): Promise<boolean> {
		const worker = await Worker.findOne({
			where: { id: workerId, company: { id: companyId } },
			relations: ['company'],
		});
		const company = await Company.findOne({
			where: { id: companyId },
			relations: ['workers'],
		});
		if (!worker || !company) throw new Error('User or company does not exits');

		const workerIndex = company.workers.findIndex(w => w.id === worker.id);
		company.workers.splice(workerIndex, 1);

		await company.save();

		return true;
	}
}
