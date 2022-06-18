import { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Pagination } from '@mui/material';
import CompanyCard from './CompanyCard';
import { useCompaniesQuery, Company, useAsignCompanyMutation } from '../../generated/graphql';

interface CompanySelectorProps {
	workerId: string;
	reload: () => void; // after any changes, reload the workers page
}

/**
 * Display all the companies, worker can apply for any company (will be aceepted inmidiately!)
 * @param props {
 *  workerId: worker that apply for the job
 *  reload: adkwoledge parent component that need to reload its content (update info)
 * }
 * @returns
 */
export default function CompanySelector(props: CompanySelectorProps) {
	const [page, setPage] = useState<number>(1);
	const [companyList, setCompanyList] = useState<Company[]>([]);
	const { data, loading, error } = useCompaniesQuery();
	const [hireJob] = useAsignCompanyMutation();
	const [id, setId] = useState<string>('-1');

	useEffect(() => {
		let initData = (page - 1) * 8;
		let endData = page * 8;
		if (data !== undefined && data?.companies.length > 0) setCompanyList(data?.companies.slice(initData, endData));
	}, [data, page]);

	/**
	 * change in the pagination event
	 * @param event
	 * @param page
	 */
	const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
		setPage(page);
	};

	/**
	 * company id selected
	 * @param id
	 */
	const selectCompany = (id: string) => {
		setId(id);
	};

	const applyJob = async () => {
		const companyId = Number.parseInt(id);
		const workerId = Number.parseInt(props.workerId);
		await hireJob({
			variables: {
				companyId: companyId,
				userId: workerId,
			},
		});
		props.reload();
	};

	if (error) return <div>{error.message}</div>;
	if (loading || !data) return <CircularProgress />;

	return (
		<>
			{
				<Grid container spacing={2} sx={{ mt: 1 }}>
					{companyList.map(company => {
						return (
							<Grid item xs={3} onClick={() => selectCompany(company.id)} key={company.id}>
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
									small={true}
									selected={id === company.id}
								/>
							</Grid>
						);
					})}
				</Grid>
			}
			<Grid container justifyContent={'space-between'} direction={'row'} sx={{ mt: 1 }}>
				<Button variant={'contained'} color='primary' onClick={() => applyJob()}>
					Apply Job
				</Button>
				<Pagination
					count={Math.ceil(data.companies.length / 8)}
					size='small'
					onChange={(e, page) => changePage(e, page)}
				/>
			</Grid>
		</>
	);
}
