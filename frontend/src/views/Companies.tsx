import { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, Pagination } from "@mui/material";
import CompanyCard from "../components/CompanyCard";
import { Company, useCompaniesQuery, useCreateCompanyMutation } from "../generated/graphql"
import AddIcon from '@mui/icons-material/Add';

export default function Companies() {
    const [createCompany] = useCreateCompanyMutation();
    const [page, setPage] = useState<number>(1);
    const [companyList, setCompanyList] = useState<Company[]>([]);
    const { data, loading, error, refetch } = useCompaniesQuery();

    useEffect(() => {
        let initData = (page-1)*8;
        let endData = page * 8;
        if(data !== undefined && data?.companies.length > 0)
            setCompanyList(data?.companies.slice(initData, endData));
    },[data, page])

    const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    }

    if (error) return <div>{error.message}</div>
    if (loading || !data) return <CircularProgress />

    return (
        <>
            <Grid container justifyContent={'flex-end'} direction={'row'}>
                <Button variant="text" onClick={async () => {await createCompany(); await refetch();}}><AddIcon/></Button>
            </Grid>
            {
                <Grid container spacing={2} sx={{ mt: 1 }}>
                {
                    companyList.map(company => {
                        return <Grid item xs={3}>
                            <CompanyCard
                                id={company.id}
                                catch_phrase={company.catch_phrase}
                                company_name={company.company}
                                industry={company.industry}
                                logo={company.logo}
                                phone={company.phone}
                                type={company.type}
                                workers={company.workers?.length||0}
                                others={company.others}
                                key={company.id}
                            />
                        </Grid>
                            
                    })
                }
                </Grid>
                
            }
            <Grid container justifyContent={'flex-end'} direction={'row'} sx={{ mt: 1 }}>
                <Pagination count={Math.ceil(data.companies.length / 8)} size="small" onChange={(e, page) => changePage(e, page)} />
            </Grid>
        </>
    )
}
