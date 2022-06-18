import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import TransgenderIcon from '@mui/icons-material/Transgender';
import moment from 'moment';

interface workerProps {
	id: string;
	username: string;
	name: string;
	surname: string;
	email: string;
	avatar: string;
	gender: string;
	phone: string;
	birthdate: string;
	others: object;
	hasJob: boolean;
}

export default function WorkerCard(props: workerProps) {
	return (
		<>
			<Card sx={{ border: props.hasJob ? '1px solid green' : '1px solid red' }}>
				<CardContent>
					<Grid container justifyContent={'space-between'} direction={'row'}>
						<Grid item xs={4}>
							<CardMedia
								component='img'
								height='70'
								image={props.avatar}
								alt={props.username}
								sx={{
									borderRadius: '50%',
									border: '1px solid lightgrey',
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<Typography gutterBottom variant='h6' component='div'>
								<CakeIcon />
								{moment(props.birthdate).format('YYYY/MM/DD')}
							</Typography>
							<Typography gutterBottom variant='caption' component='div'>
								<TransgenderIcon />
								{props.gender}
							</Typography>
						</Grid>
						<Grid item xs={8} sx={{ ml: 1 }}>
							<Typography gutterBottom variant='h6' component='div'>
								{props.surname + ',' + props.name}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<Grid container justifyContent={'space-between'} direction={'row'} alignContent={'center'}>
						<Grid item>
							<PhoneAndroidIcon />
							{props.phone.split('x')[0]}{' '}
						</Grid>
						<Grid item>
							<EmailIcon />
							{props.email}
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		</>
	);
}
