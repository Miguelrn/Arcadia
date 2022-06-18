import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import FactoryIcon from '@mui/icons-material/Factory';

interface companyProps {
	id: string;
	company_name: string;
	industry: string;
	catch_phrase: string;
	logo: string;
	type: string;
	phone: string;
	others?: Object;
	workers: number;
	small: boolean; // display less info if true
	selected: boolean; // display a selected border
}

export default function CompanyCard(props: companyProps) {
	return (
		<>
			<Card sx={{ border: props.selected ? '2px solid #00205b' : '' }}>
				<CardMedia component='img' height={100} image={props.logo} alt={props.company_name} />
				<CardContent sx={{ minHeight: '100px' }}>
					<Grid container justifyContent={'space-between'} direction={'row'}>
						<Grid item xs>
							<Typography gutterBottom variant='h6' component='div'>
								{props.company_name}
							</Typography>
							{!props.small && (
								<Typography variant='caption' color='text.secondary'>
									<FactoryIcon fontSize={'small'} />
									{props.type}
								</Typography>
							)}
						</Grid>
					</Grid>

					{!props.small && (
						<Typography variant='body2' color='text.secondary'>
							{props.catch_phrase}
						</Typography>
					)}
				</CardContent>

				<CardActions>
					<Grid container justifyContent={'space-between'} direction={'row'} alignContent={'center'}>
						<Grid item>
							<PhoneAndroidIcon />
							{props.phone}{' '}
						</Grid>
						{!props.small && (
							<Grid item>
								{props.workers}
								<AccessibilityNewIcon />
							</Grid>
						)}
					</Grid>
				</CardActions>
			</Card>
		</>
	);
}
CompanyCard.defaultProps = {
	selected: false,
};
