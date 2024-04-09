import { ChangeEvent, KeyboardEvent, useState } from "react";
import { styled } from '@mui/material/styles';

//components
// import { Button } from "../elements/ui/Button";
import { Input } from "../elements/ui/Input";


//components/mui
import Button, { ButtonProps } from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';

//styles
import s from './AddItemForm.module.css';
import { getAddFormIconSx } from "../pages/TodoList.styles";

export type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
	const { addItem } = props;
	const [inputValue, setInputValue] = useState('');
	const [errors, setErrors] = useState<Array<string> | []>([]);

	const inputItemLength = inputValue.length;


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
			{/* <Input
				className={errors.length > 0 ? s.error : ''}
				placeholder={'Enter task'}
				value={inputValue}
				onChange={handleInputChange}
				onKeyUp={handleAddItemOnKeyUp}
			/> */}
			<TextField
				label={'Enter task'}
				variant={'outlined'}
				error={errors.length > 0}
				// className={errors.length > 0 ? s.error : ''}
				value={inputValue}
				size={'small'}
				onChange={handleInputChange}
				onKeyUp={handleAddItemOnKeyUp}
				helperText={errors}
			/>
			<IconButton
				onClick={handleAddItem}
				color={'primary'}
			>
				<AddBoxIcon sx={getAddFormIconSx()} />
			</IconButton>
			{/* <ColorButton
				variant="contained"
				onClick={handleAddItem}
				disabled={errors.length > 0}
			>
				+
			</ColorButton> */}
			{/* <Button title={'+'} onClick={handleAddItem} isDisabled={errors.length > 0} /> */}
			{/* <div>
				{errors.length > 0 && (
					errors.map((error) => (
						<div className={s.errorMessage}>{error}</div>
					))
				)}
			</div> */}
		</div>
	)
}

