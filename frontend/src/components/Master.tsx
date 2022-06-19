import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import BusinessIcon from '@mui/icons-material/Business';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import ListItemText from '@mui/material/ListItemText';
import AppRoutes from '../Routes';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { Grid, ImageList } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	backgroundColor: '#00205b',
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));
// function Item(props: BoxProps) {
// 	const { sx, ...other } = props;
// 	return (
// 		<Box
// 			sx={{
// 				p: 1,
// 				m: 1,
// 				bgcolor: theme => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
// 				color: theme => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
// 				border: '1px solid',
// 				borderColor: theme => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
// 				borderRadius: 2,
// 				fontSize: '0.875rem',
// 				fontWeight: '700',
// 				...sx,
// 			}}
// 			{...other}
// 		/>
// 	);
// }

export default function Master() {
	const [open, setOpen] = useState(false);

	const handleToggleOpen = () => {
		setOpen(!open);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed'>
				<Toolbar>
					<Grid container direction='row' justifyContent='space-between' alignItems='center'>
						<Grid item xs={8} container direction='row' justifyContent='space-between' alignItems='center'>
							<Grid item xs={1}>
								<IconButton color='inherit' onClick={handleToggleOpen} edge='start'>
									<MenuIcon />
								</IconButton>
							</Grid>
							<Grid item xs={11}>
								<ImageList component={Link} href='/'>
									<img width='150' height='auto' src={`./src/logo.png`} loading='lazy' />
								</ImageList>
							</Grid>
						</Grid>
						<Grid item xs={4} container direction='row' justifyContent='flex-end' alignItems='center'>
							<IconButton
								color='inherit'
								onClick={() =>
									window.open('https://github.com/tziea/Full-Stack-Developer/blob/main/README.md', '_blank')
								}>
								<GitHubIcon />
							</IconButton>
							<PersonIcon />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open}>
				<DrawerHeader>
					<IconButton>
						<ChevronRightIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItem button component={Link} href='/companies'>
						<ListItemIcon>
							<BusinessIcon />
						</ListItemIcon>
						<ListItemText primary='Companies' sx={{ opacity: open ? 1 : 0 }} />
					</ListItem>

					<ListItem button component={Link} href='/workers'>
						<ListItemIcon>
							<AccountBoxIcon />
						</ListItemIcon>
						<ListItemText primary='Workers' sx={{ opacity: open ? 1 : 0 }} />
					</ListItem>

					<ListItem button component={Link} href='/worldmap'>
						<ListItemIcon>
							<LanguageIcon />
						</ListItemIcon>
						<ListItemText primary='World Map' sx={{ opacity: open ? 1 : 0 }} />
					</ListItem>
				</List>
			</Drawer>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<AppRoutes />
			</Box>
		</Box>
	);
}
