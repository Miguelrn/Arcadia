import { useEffect, useState } from 'react';
import { Breadcrumbs, Button, CircularProgress, Grid, Link, Pagination } from '@mui/material';
import CompanyCard from '../components/Company/CompanyCard';
import { Company, useCompaniesQuery, useCreateCompanyMutation } from '../generated/graphql';
import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CompanyCardForm from '../components/Company/CompanyCardForm';

interface CompaniesProps {
	small: boolean;
}

/**
 * Company page, /companies
 * this page its protected and only users with valid token will be able to visit
 * @param props {
 *  small: display smaller card of company
 * }
 * @returns jsx with the current companies (not disabled!)
 */
export default function Companies(props: CompaniesProps) {
	const [createCompany] = useCreateCompanyMutation();
	const [page, setPage] = useState<number>(1);
	const [companyList, setCompanyList] = useState<Company[]>([]);
	const { data, loading, error, refetch } = useCompaniesQuery();
	const [open, setOpen] = useState(false);
	const [id, setId] = useState('-1');

	useEffect(() => {
		let initData = (page - 1) * 8;
		let endData = page * 8;
		if (data !== undefined && data?.companies.length > 0) setCompanyList(data?.companies.slice(initData, endData));
	}, [data, page]);

	const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
		setPage(page);
	};

	const switchCompany = (id: string, reload: boolean) => {
		if (id !== undefined) setId(id);
		setOpen(!open);
		if (reload) refetch();
	};

	if (error) return <div>{error.message}</div>;
	if (loading || !data) return <CircularProgress />;

	return (
		<>
			<Grid container justifyContent={'space-between'} direction={'row'}>
				<Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
					{[
						<Link underline='hover' key='1' color='inherit' href='/'>
							Home
						</Link>,
						<Link underline='hover' key='2' color='inherit' href='/companies'>
							Company
						</Link>,
					]}
				</Breadcrumbs>
				<Button
					variant='text'
					onClick={async () => {
						await createCompany();
						await refetch();
					}}>
					<AddIcon />
				</Button>
			</Grid>
			{
				<Grid container spacing={2} sx={{ mt: 1 }}>
					{companyList.map(company => {
						return (
							<Grid item xs={3} onClick={() => switchCompany(company.id, false)} key={company.id}>
								<CompanyCard
									id={company.id}
									catch_phrase={company.catch_phrase}
									company_name={company.company}
									industry={company.industry}
									logo={company.logo}
									phone={company.phone}
									type={company.type}
									workers={company.workers?.length || 0}
									others={company.others}
									key={company.id}
									small={props.small}
								/>
							</Grid>
						);
					})}
				</Grid>
			}
			<Grid container justifyContent={'flex-end'} direction={'row'} sx={{ mt: 1 }}>
				<Pagination
					count={Math.ceil(data.companies.length / 8)}
					size='small'
					onChange={(e, page) => changePage(e, page)}
				/>
			</Grid>
			<CompanyCardForm open={open} id={id} handleClose={(id, reload) => switchCompany(id, reload)} />
		</>
	);
}

// Companies.propTypes = {
//     small: false
// };
