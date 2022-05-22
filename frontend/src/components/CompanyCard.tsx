import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
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
}

export default function CompanyCard(props: companyProps) {

return <>
        <Card>
            <CardMedia
                component="img"
                height="100"
                image={props.logo}
                alt={props.company_name}
            />
            <CardContent>
                <Grid container justifyContent={'space-between'} direction={'row'}>
                    <Grid item xs>
                        <Typography gutterBottom variant="h6" component="div">
                            {props.company_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            <FactoryIcon fontSize={'small'}/>{props.type}
                        </Typography>
                    </Grid>
                </Grid>

                <Typography variant="body2" color="text.secondary">
                    {props.catch_phrase}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container justifyContent={'space-between'} direction={'row'} alignContent={'center'}>
                    <Grid item><PhoneAndroidIcon />{props.phone} </Grid>
                    <Grid item>{props.workers}<AccessibilityNewIcon /></Grid>
                </Grid>
            </CardActions>
        </Card>
    </>
}