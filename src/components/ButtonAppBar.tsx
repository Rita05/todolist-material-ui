//elements/mui
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { MenuButton } from '../elements/material/MenuButton';

//styles
import { statusButtonsGroupSX } from '../pages/TodoList.styles';

type CustomAppBarPropsType = {
	onChangeTheme: () => void;
};

export const ButtonAppBar = ({ onChangeTheme }: CustomAppBarPropsType) => {
	const theme = useTheme();

	return (
		<AppBar position="static" sx={{ mb: '30px' }}>
			<Toolbar sx={statusButtonsGroupSX}>
				<IconButton
					color="inherit"
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				</Typography>
				<div>
					<MenuButton background={theme.palette.primary.light}>Login</MenuButton>
					<MenuButton background={theme.palette.primary.light}>Logout</MenuButton>
					<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
					<Switch onChange={onChangeTheme} color={'default'} />
				</div>
			</Toolbar>
		</AppBar>
	);
};
