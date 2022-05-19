import { Mutation, Query, Resolver } from 'type-graphql';
import { fetch } from 'apollo-server-env';
import { Company } from '../entity/Company';


@Resolver()
export class CompanyResolver {
    /**
        * Actual list of all the companies enabled
        * @returns List of companies
    */
    @Query(() => [Company])
    async companies(): Promise<Company[]> {
        return await Company.find({ where: { disabled: false } });
    }

    /**
     * Function in charge of creation a random company, the info its extracted from https://random-data-api.com/api/company/random_company
     * will check for no duplicate company-id in case there is a chance of this happening.
     * @returns random company that has been created
     */
    @Mutation(() => Company)
    async createCompany(): Promise<Company> {
        let validCompany = false;
        let company = null;

        while(!validCompany) {
            company = await fetch('https://random-data-api.com/api/company/random_company', {})
            .then(res => res.json())
            .catch(e => console.log(e))

            const res = await Company.findOne({ where: { id: company.id } });
            if (!res) validCompany = true;
        }

        const newCompany = await Company.create({
            id: company.id,
            company: company.business_name,
            industry: company.industry,
            catch_phrase: company.catch_phrase,
            logo: company.logo,
            type: company.type,
            phone: company.phone_number,
        });

        newCompany.others = {
            "buzzword": company.buzzword,
            "bs_company_statement": company.bs_company_statement,
            "employee_identification_number": company.employee_identification_number,
            "duns_number": company.duns_number,
            "type": company.type,
            "full_address": company.full_address,
            "latitude": company.latitude,
            "longitude": company.longitude
        }

        await newCompany.save();

        return newCompany;
    }

    // @Mutation(() => Boolean)
    // async asignCompany(
    //     @Arg("identifier", () => String) identifier: string,
    //     @Arg("projectName", () => String) projectName: string,
    // ): Promise<boolean> {
    //     const user = await User.findOne({ where: { userId: identifier } });
    //     const project = await Project.findOne({ where: { name: projectName }, relations: ['workers'] });
    //     if (!user || !project) throw new Error('User or project does not exits');

    //     project.workers?.push(user);
    //     await project.save();
    //     return true;
    // }

    // @Mutation(() => Boolean)
    // async revokeRefreshTokenForUser(@Arg("userId", () => Int) userId: number) {
    //   await getConnection()
    //     .getRepository(User)
    //     .increment({ id: userId }, "tokenVersion", 1);

    //     return true;
    // }

    // @Query(() => String)
    // @UseMiddleware(isAuth)
    // bye(
    //   @Ctx() { payload } : MyContext
    // ) {
    //   return "Bye " + payload!.userId;
    // }


}