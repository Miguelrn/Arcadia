import { Breadcrumbs, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LanguageIcon from '@mui/icons-material/Language';

/**
 * Home page, /
 * Unprotected page
 * @returns
 */
export default function Home() {
	const icons = [<BusinessIcon key={1} />, <AccountBoxIcon key={2} />, <LanguageIcon key={3} />];
	return (
		<>
			<Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
				{[
					<Link underline='hover' key='1' color='inherit' href='/'>
						Home
					</Link>,
				]}
			</Breadcrumbs>
			<Grid
				container
				justifyContent={'center'}
				direction={'row'}
				spacing={2}
				alignItems={'center'}
				sx={{ height: '80vh' }}>
				{['companies', 'workers', 'worldmap'].map((item, index) => {
					return (
						<Link key={index} color='inherit' underline='hover' href={'/' + item}>
							<Card sx={{ m: 1, width: '250px', p: 1 }}>
								<CardContent sx={{}}>
									<Grid
										container
										justifyContent={'center'}
										direction={'column'}
										spacing={2}
										alignItems={'center'}
										sx={{ height: '15vh' }}>
										<Typography variant='h6' component='div'>
											{icons[index]}
											{item}
										</Typography>
									</Grid>
								</CardContent>
							</Card>
						</Link>
					);
				})}
			</Grid>
		</>
	);
}
