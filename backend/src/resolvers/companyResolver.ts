import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { fetch } from 'apollo-server-env';
import { Company } from '../entity/Company';
import { isAuth } from '../isAuthMiddleware';


@Resolver()
export class CompanyResolver {
    /**
     * Actual list of all the companies enabled
     * @returns List of companies
     */
    @Query(() => [Company])
    @UseMiddleware(isAuth)
    async companies(): Promise<Company[]> {
        return await Company.find({ where: { disabled: false }, relations: ['workers'] });
    }

    /**
     * Find a company by the company id
     * @returns company if found
     */
    @Query(() => Company, {nullable: true})
    @UseMiddleware(isAuth)
    async companyById(
        @Arg("companyId", () => Number) companyId: number,
    ): Promise<Company> {
        const company = await Company.findOne({ where: { id: companyId }, relations: ['workers'] });
        if (!company) throw new Error('Company does not exits');
        return company;
    }

    /**
     * Function in charge of creation a random company, the info its extracted from https://random-data-api.com/api/company/random_company
     * will check for no duplicate company-id in case there is a chance of this happening.
     * @returns random company that has been created
     */
    @Mutation(() => Company)
    @UseMiddleware(isAuth)
    async createCompany(): Promise<Company> {
        let validCompany = false;
        let company = null;

        while (!validCompany) {
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

    /**
     * Update company fields
     * @param companyId 
     * @param companyName 
     * @param industry 
     * @param catch_phrase 
     * @param logo 
     * @param type 
     * @param phone 
     * @param others 
     * @returns 
     */
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateCompany(
        @Arg("companyId", () => Number) companyId: number,
        @Arg("companyName", () => String) companyName: string,
        @Arg("industry", () => String) industry: string,
        @Arg("catch_phrase", () => String) catch_phrase: string,
        @Arg("logo", () => String) logo: string,
        @Arg("type", () => String) type: string,
        @Arg("phone", () => String) phone: string,
        @Arg("others", () => String) others: string,
    ): Promise<Boolean> {
        const company = await Company.findOne({ where: { id: companyId }, relations: ['workers'] });
        if (!company) throw new Error('Company does not exits');

        company.company = companyName;
        company.industry = industry;
        company.catch_phrase = catch_phrase;
        company.logo = logo;
        company.type = type;
        company.phone = phone;
        company.others = JSON.parse(others);

        await company.save();

        return true;
    }

    /**
     * logical delete company
     * @param companyId 
     * @returns 
     */
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async disableCompany(
        @Arg("companyId", () => Number) companyId: number,
    ): Promise<Boolean> {
        const company = await Company.findOne({ where: { id: companyId }, relations: ['workers'] });
        if (!company) throw new Error('Company does not exits');

        company.disabled = true;

        await company.save();

        return true;
    }
}