import { ChangeEvent, KeyboardEvent, useState } from "react";
import { styled } from '@mui/material/styles';

//components/mui
import Button, { ButtonProps } from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';

//styles
import s from './AddItemForm.module.css';
import { getAddFormButtonSX, getAddFormIconSX, inputAddItemFormSX } from "../pages/TodoList.styles";

//hooks
import { useTheme } from '@mui/material/styles';

export type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
	const { addItem } = props;
	const [inputValue, setInputValue] = useState('');
	const [errors, setErrors] = useState<Array<string> | []>([]);

	const inputItemLength = inputValue.length;

	const theme = useTheme();

	const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
		color: theme.palette.getContrastText('#6C63FF'),
		backgroundColor: '#6C63FF',
		'&:hover': {
			backgroundColor: '#574bfa',
		},
		height: '30px',
		minWidth: '43px'
	}));

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.currentTarget.value);
	}

	const handleAddItem = () => {
		const trimmedTaskValue = inputValue.trim();
		if (trimmedTaskValue !== '') {
			addItem(inputValue.trim());
		} else {
			setErrors(['This field is required']);
		};
		setInputValue('');
	}


	const handleAddItemOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
		setErrors([]);
		if (event.key === 'Enter' && inputItemLength) {
			handleAddItem();
		}
	}

	return (
		<div className={s.addItemFormContainer}>
			<TextField
				label={'Enter task'}
				value={inputValue}
				sx={inputAddItemFormSX}
				variant={'outlined'}
				error={errors.length > 0}
				size={'small'}
				onChange={handleInputChange}
				onKeyUp={handleAddItemOnKeyUp}
				helperText={errors}
			/>
			<IconButton
				sx={getAddFormButtonSX(theme)}
				onClick={handleAddItem}
				disabled={errors.length > 0}
			>
				<AddBoxIcon sx={getAddFormIconSX()} />
			</IconButton>
			{/* <ColorButton
				variant="contained"
				onClick={handleAddItem}
				disabled={errors.length > 0}
			>
				+
			</ColorButton> */}
		</div>
	)
}

